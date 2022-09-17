const Sequelize = require('sequelize')
const database = require('../../database/index')

const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    tel: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    actived: {
        type : Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '1'
    },
    datanascimento: {
        type: Sequelize.DATE,
    },
    uf:{
        type: Sequelize.STRING(45),
    },
    cidade:{
        type: Sequelize.STRING(45)
    },
    genero: {
        type: Sequelize.STRING(45)
    },
    nickname: {
        type: Sequelize.STRING(45)
    },
    image: {
        type: Sequelize.STRING(100)
    }
})
module.exports = User
