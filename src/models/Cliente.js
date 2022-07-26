const {Sequelize, sequelize} = require('../database/db');
const Instituicao = require('./Instituicao');

const Cliente = sequelize.define('clientes', {
    id_cliente:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    matricula:{
        type: Sequelize.STRING(30),
        unique: true
    },
    nome_completo:{
        type: Sequelize.STRING(45),
        allowNull: false
    },
    CPF:{
        type: Sequelize.CHAR(11),
        allowNull: false,
        unique: true
    },
    data_nascimento:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING(60),
        allowNull:false,
        unique: true
    },
    telefone:{
        type: Sequelize.STRING(11),
        allowNull: false
    },
    senha:{
        type: Sequelize.CHAR(8),
        allowNull: false
    },
    numero_conta:{
        type: Sequelize.INTEGER(8),
        allowNull: false,
        unique: true
    },
    status_conta:{
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'INATIVO'
    },
    tipo_conta:{
        type: Sequelize.STRING(15),
        allowNull: false
    },
    saldo:{
        type: Sequelize.DECIMAL(8,2),
        allowNull: false,
        defaultValue: 0
    }
})

Instituicao.hasMany(Cliente, {
    constraints: true,
    foreignKey: {
        name: 'codigo_instituicao',
        allowNull: false
    }
    
})

Cliente.belongsTo(Instituicao,{
    foreignKey: 'codigo_instituicao'
});

module.exports = Cliente;