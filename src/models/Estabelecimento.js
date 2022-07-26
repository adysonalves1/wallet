const {Sequelize, sequelize} = require('../database/db');
const Instituicao = require('./Instituicao');
const Transacoes = require('./Transacoes');

const Estabelecimento = sequelize.define('estabelecimento',{
    localizacao:{
        type: Sequelize.STRING(60),
        allowNull: false
    }
})

Instituicao.hasOne(Estabelecimento,{
    constaints: true,
    foreignKey: {
        name: 'codigo_instituicao',
        allowNull: false
    }
})
Estabelecimento.belongsTo(Instituicao,{
    foreignKey: 'codigo_instituicao'
})

Estabelecimento.hasMany(Transacoes,{
    foreignKey: 'id_origem'
    
})



module.exports = Estabelecimento;