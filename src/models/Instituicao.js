const {Sequelize, sequelize} = require('../database/db');

const Instituicao = sequelize.define('instituicoes',{
    codigo:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome_instituicao:{
        type: Sequelize.STRING(60),
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING(80),
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    bairro:{
        type: Sequelize.STRING(30),
        allowNull: false
    },
    UF:{
        type: Sequelize.CHAR(2),
        allowNull: false
    },
    cep:{
        type: Sequelize.CHAR(9)
    },
    telefone:{
        type: Sequelize.CHAR(11),
        allowNull: false
    }
});

module.exports = Instituicao;