const {Sequelize, sequelize} = require('../database/db');
const Cliente = require('./Cliente');
const Estabelecimento = require('./Estabelecimento');

const Transacoes = sequelize.define('transacoes_clientes',{
    id_transacao:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    valor:{
        type: Sequelize.DECIMAL(8,2),
        allowNull: false
    },
    tipo_transacao:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_destino:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Cliente.hasMany(Transacoes,{
    constraints: true,
    foreignKey:{
        name: 'id_origem',
        allowNull: false
    }
})

Transacoes.belongsTo(Cliente, {
    foreignKey: 'id_origem'
})



module.exports = Transacoes;

