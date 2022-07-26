const database = require('../database/db')

const Admin = database.sequelize.define('admin',{
    id:{
        type: database.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    usuario:{
        type: database.Sequelize.STRING(15),
        allowNull: false,
        unique: true
    },
    senha:{
        type: database.Sequelize.STRING(8),
        allowNull: false
    }
})

module.exports = Admin;