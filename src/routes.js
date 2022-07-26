const express = require('express');
const Cliente = require('./models/Cliente');
const Instituicao = require('./models/Instituicao');
const router = express.Router()


router.get('/', (req, res) => {
    if (req.statusCode == 404) {
        res.sendFile('index.html')
    }
    res.sendFile('index.html')

})

router.get('/criar-conta', async (req, res) => {

    await Instituicao.findAll().then(dados => {
        if (dados.length > 0) {
            res.render('criar-conta', { cssConta: true, mask: 'maskCad', title: 'Criar conta - Wallet', select: true, dados: dados.map(dados => dados.toJSON()) })
        } else {
            if (dados.length = -1)
                res.render('criar-conta', { cssConta: true, mask: 'maskCad', title: 'Criar conta - Wallet', select: true, dados: dados.map(dados => dados.toJSON()) })
        }
    }).catch(err => {
        console.log(err)
    })
})

router.get('/erro-cadastro', (req, res) => {
    if (req.session.erros) {
        var arrayErros = req.session.erros;
        req.session.erros = ''
        return res.render('error-cadastro', { title: 'Erro no cadastro!', erros: arrayErros, cssConta: true })
    }

})

router.get('/account-sucesso', (req, res) => {
    if (req.session.sucess) {
        if (req.session.sucess == false) {
            return res.redirect('/criar-conta')
        }
        return res.render('sucess-cadastro', { title: 'Cadastro finalizado!', MsgSucess: true, cssConta: true })
        req.session.sucess = false;
    }
})

router.get('/login', (req, res) => {
    res.sendFile('/inicio/index.html')
})

router.get('/recuperar-senha', (req, res) => {
    if (req.session.erro) {
        res.render('recuperar-senha', { title: 'Recuperar senha', cssConta: true, mask: 'maskCad', msg: 'Nenhuma conta encontrada...' })
    }
    req.session.erro = false;
    res.render('recuperar-senha', { title: 'Recuperar senha', cssConta: true, mask: 'maskCad' })
})

router.get('/admin', async (req, res) => {
    await Cliente.findAll({
        where: {
            status_conta: 'INATIVO'
        }
    }).then(dados => {
        if (dados.length > 0) {
            res.render('admin', {
                title: 'Painel Administrativo',
                cssAdmin: true,
                dados: dados.map(dados => dados.toJSON()),
                table: true
            })
        } else {
            res.render('admin', {
                title: 'Painel Administrativo',
                cssAdmin: true,
                dados: dados.map(dados => dados.toJSON()),
                table: false
            })
        }
    })
})



// ROTAS POST
router.post('/cadastrar', async (req, res) => {

    // VALORES VINDOS DO FORMULÁRIO
    let dados = req.body

    // ARRAY COM ERROS
    var erros = [];

    // LIMPAR CARACTERES ESPECIAIS E PADRONIZA CAMPOS
    dados.nome = dados.nome.replace(/[^A-zÀ-ú\s]/gi, '');
    dados.cpf = dados.cpf.replace(/[a-zA-Z\u00C0-\u00FF ]+/i, '');
    dados.cpf = dados.cpf.replace(/\W|_/, '');
    dados.telefone = dados.telefone.replace(/[a-zA-Z\u00C0-\u00FF ]+/i, '');
    dados.telefone = dados.telefone.replace(/\W|_/, '');

    // REMOVE ESPAÇOS EM BRANCO
    dados.nome = dados.nome.trim();
    dados.cpf = dados.cpf.trim();
    dados.email = dados.email.trim();
    dados.telefone = dados.telefone.trim()
    dados.senha = dados.senha.trim()
    dados.matricula = dados.matricula.trim()

    if (dados.matricula != '') {
        dados.matricula = dados.matricula.trim()
    }

    // TORNA CAMPO EM MINUSCULO
    dados.nome = dados.nome.toLowerCase()
    dados.email = dados.email.toLowerCase()


    // GERADOR DE NÚMERO DA CONTA
    // 4 PRIMEROS NÚMEROS DO CPF + 4 NÚMEROS ALEATORIOS
    let num_conta = dados.cpf.toString().substr(0, 4) + Math.floor(Math.random() * 10000);

    // VERIFICA SE OS CAMPOS ESTÃO VAZIOS
    if (dados.nome == '' || typeof dados.nome == undefined || dados.nome == null) {
        erros.push({ mensagem: 'Nome não pode ser vazio!' })
    }

    if (dados.email == '' || typeof dados.email == undefined || dados.email == null) {
        erros.push({ mensagem: 'E-mail não pode ser vazio!' })
    }

    if (dados.cpf == '' || typeof dados.cpf == undefined || dados.cpf == null) {
        erros.push({ mensagem: 'CPF não pode ser vazio!' })
    }

    if (dados.dataNascimento == '' || typeof dados.dataNascimento == undefined || dados.email == null) {
        erros.push({ mensagem: 'Data de nascimento não pode ser vazia!' })
    }

    if (dados.telefone == '' || typeof dados.telefone == undefined || dados.telefone == null) {
        erros.push({ mensagem: 'Telefone não pode ser vazio!' })
    }

    if (dados.instituicao == '' || typeof dados.instituicao == undefined || dados.instituicao == null) {
        erros.push({ mensagem: 'Informe uma instituição!' })
    }

    if (dados.senha == '' || typeof dados.senha == undefined || dados.senha == null || dados.senha.length < 8) {
        erros.push({ mensagem: 'Senha inválida! Crie uma senha de no minimo 8 caracteres!' })
    }


    // VERIFICA SE OS CAMPOS SÃO VÁLIDOS
    if (!/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi.test(dados.nome)) {
        erros.push({ mensagem: 'Nome inválido!' })
    }

    if (!/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/.test(dados.email)) {
        erros.push({ mensagem: 'E-mail inválido!' })

    }

    if (!/[0-9]/.test(dados.cpf) || dados.cpf.length < 11) {
        erros.push({ mensagem: 'CPF inválido!' })

    }

    if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(dados.dataNascimento)) {
        erros.push({ mensagem: 'Data de nascimento inválida!' })
    }

    if (!/[0-9]/.test(dados.telefone) || dados.telefone.length < 10) {
        erros.push({ mensagem: 'Telefone inválido! Informe apenas números.' })
    }

    const { Op } = require("sequelize");
    if (await Cliente.findOne({
        where: {

            [Op.or]: [
                { CPF: dados.cpf },
                { matricula: dados.matricula },
                { email: dados.email }
            ]

        }
    }) != null) {
        erros = [];
        erros.push({
            mensagem: "Conta já existe ou o formulário está vazio!"
        })
    }

    if (erros.length > 0) {
        console.log(erros);
        req.session.erros = erros;
        req.session.sucess = false;
        return res.redirect('/erro-cadastro');
    }




    req.session.sucess = true;

    await Cliente.create({
        matricula: dados.matricula,
        nome_completo: dados.nome,
        CPF: dados.cpf,
        data_nascimento: dados.dataNascimento,
        email: dados.email,
        telefone: dados.telefone,
        senha: dados.senha,
        numero_conta: num_conta,
        codigo_instituicao: dados.instituicao,
        tipo_conta: dados.tipo_conta

    }).then(sucess => {
        console.log('Adicionado com sucess');
    }).catch(err => {
        console.log('Houve um erro: ' + err);
    })

    return res.redirect('/account-sucesso');
})

router.post('/recuperar-senha', async (req, res) => {
    let dados = req.body

    const { Op } = require("sequelize");
    await Cliente.findOne({
        where: {

            [Op.and]: [
                { CPF: dados.cpf },
                { email: dados.email },
                { data_nascimento: dados.dataNascimento }
            ]

        }
    }).then(dados => {
        if (dados != null) {
            return res.render('nova-senha', { title: 'Nova senha', cssConta: true, id: dados.id_cliente })
        }

        req.session.erro = true;
        return res.redirect('/recuperar-senha')

    })

})

router.post('/update-passwd', async (req, res) => {
    await Cliente.update(
        {
            senha: req.body.senha
        },
        {
            where:{
                id_cliente: req.body.id
            }
        }

    ).then(sucess => {
        return res.redirect('/login')
    }).catch(err => {
        console.log('OCORREU UM ERRO AO ATUALIZAR: ' + err);
        return res.redirect('/recuperar-senha')
    })
})

module.exports = router;