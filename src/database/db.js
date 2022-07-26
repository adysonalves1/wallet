const Sequelize = require('sequelize')
const sequelize = new Sequelize('wallet','SEU USUARIO DO BD','SENHA BD', {
    dialect: 'mysql',
    host: 'localhost',
    port: 'PORTA DE ACESSO AO BANCO'
})

module.exports = {
    Sequelize,
    sequelize
}