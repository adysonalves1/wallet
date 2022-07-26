CREATE TABLE instituicao(
codigo int AUTO_INCREMENT NOT NULL,
nome_instituicao varchar(50) NOT NULL,
endereco varchar(50) NOT NULL,
cidade varchar(40) NOT NULL,
bairro varchar(30) NOT NULL,
UF varchar(2) NOT NULL,
cep: varchar(9) NOT NULL,
telefone varchar(13) NOT NULL,
primary key(codigo)
);

CREATE TABLE responsaveis(
id_responsavel int auto_increment NOT NULL,
nome_completo varchar(45) NOT NULL,
data_nascimento date NOT NULL,
CPF varchar(11) NOT NULL,
telefone varchar(13) NOT NULL,
aluno_matricula int NOT NULL,
primary key (id_responsavel),
unique key (CPF),
foreign key (aluno_matricula) REFERENCES alunos(id_aluno)
);

CREATE TABLE alunos(
id_aluno int auto_increment NOT NULL,
matricula varchar (25) NOT NULL,
nome_completo varchar(45) NOT NULL,
CPF varchar (11) NOT NULL,
data_nascimento date NOT NULL,
nome_mae varchar(45),
email varchar(50) NOT NULL,
senha varchar(30) NOT NULL,
numero_conta int NOT NULL ,
codigo_instituicao int NOT NULL,
status_conta  BOOLEAN not null DEFAULT 0,
saldo DECIMAL(8,2) NOT NULL,
primary key (id_aluno),
UNIQUE KEY (cpf,codigo_identificador,matricula,email),
foreign key (codigo_instituicao) REFERENCES instituicao(codigo)
);


CREATE TABLE funcionarios(
id int auto_increment NOT NULL,
nome_completo varchar(45) NOT NULL,
data_nascimento date NOT NULL,
CPF varchar(11) not null,
nome_mae varchar(45),
email varchar(50) NOT NULL,
senha varchar(30) NOT NULL,
telefone varchar (13) NOT NULL,
cargo varchar(40),
numero_conta int NOT NULL ,
codigo_instituicao int NOT NULL,
status_conta  BOOLEAN not null DEFAULT 0,
saldo DECIMAL(8,2) NOT NULL,
primary key(id),
foreign key (codigo_instituicao) REFERENCES instituicao(codigo),
unique key(CPF,email)
);

CREATE TABLE estabelecimentos(
id int auto_increment NOT NULL PRIMARY KEY,
localizacao varchar(50) not null,
codigo_instituicao int not null,
foreign key (codigo_instituicao) references instituicao(codigo)
);

CREATE TABLE transacoes(
id_transacao int auto_increment NOT NULL,
id_cliente int NOT NULL,
id_estabelecimento int NOT NULL,
valor DECIMAL(8,2) NOT NULL,
tipo_transacao int(1) NOT NULL,
primary key(id_transacao),
foreign key(id_origem) references alunos(id_aluno),
foreign key(id_destino) references estabelecimento(id)
);

CREATE TABLE admin (
id_admin int auto_increment NOT NULL,
usuario varchar(15) NOT NULL,
senha varchar(30) NOT NULL,
primary key(id_admin),
UNIQUE KEY(usuario)
);



