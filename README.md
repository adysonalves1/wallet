# COMO EXECUTAR?
<p>Abra o terminal na pasta do projeto e execute o seguinte comando para instalar as dependências: <strong>npm i</strong></p>

<p> O projeto utiliza MySql como SGBD, sendo assim, crie um DATABASE com nome de wallet.<br/>
O processo de criação das tabelas ocorrerá de forma automatizada assim que o servidor for inciado.
</p>

<p>No projeto, vá até o diretório SRC > DATABASE e abra o arquivo db.js</p><br>
<p>Altere os seguintes trechos de código: SEU USUARIO DO BD, SENHA BD e PORTA DE ACESSO AO BANCO com as credenciais de acesso do seu banco</p><br/>

<p>Feito isso, retorne o diretório inicial do projeto e execute o comando no terminal: node index.js</p><br/>

<p>Se estiver tudo correto, o servidor será iniciado e as tabelas serão criadas no banco de dados.</p>

<p>Com o servidor rodando, acesse o seu Banco de dados MySql e execute o comando abaixo:</p>
<span>INSERT INTO instituicoes (nome_instituicao,endereco,cidade,bairro,UF,cep,telefone,createdAt,updatedAt) values('IFPE - CAMPUS RECIFE','Av. Prof. Luís Freire, 500','Recife','Cidade Universitária','PE','50740-545',' 8121251600','2019-07-09 11:42:00','2019-07-09 11:42:00');</span>

<br/><br/>

<span> Equipe: Adyson, David, Gabriel Eugenio </span>


