(async() => {

    const express = require('express');
    const app = express();
    const PORT = process.env.PORT || 3000;
    const router = require('./src/routes');
    const path = require('path');
    const session = require('express-session')
    app.use(express.static('public'));
    const hbs = require('express-handlebars');
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))

    // CONFIGURAÇÃO DAS SESSION
    app.use(session({
        secret: 'OMUNDOESTÁUMCAOS',
        resave: false,
        saveUninitialized: true
    }))
    
    // DATABASE
    const database = require('./src/database/db');
    
    // MODELS
    const Admin = require('./src/models/Admin');
    const Instituicao = require('./src/models/Instituicao');
    const Cliente = require('./src/models/Cliente');
    const Estabelecimento = require('./src/models/Estabelecimento');
    const Transacoes = require('./src/models/Transacoes')

    await database.sequelize.sync()
    
    
    
    // CONFIG HANDLEBARS
    app.engine('hbs', hbs.engine({
        extname: '.hbs',
        defaultLayout: 'main'
    })); app.set('view engine', 'hbs');

    
    // ROTAS
    app.use('/', router)
    
    
    
    app.listen(PORT, () => {
        console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });

})()
