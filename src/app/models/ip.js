const Sequelize = require('sequelize')
const database = require('../../database/index')
const User = require('./user')

const Ip = database.define('ip', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    contry: {
        type: Sequelize.STRING(100)
    },
    region: {
        type: Sequelize.STRING(100)
    },
    regionName: {
        type: Sequelize.STRING(100)
    },
    city: {
        type: Sequelize.STRING(100)
    },
    zipCode: {
        type: Sequelize.STRING(100)
    },
    isp: {
        type: Sequelize.STRING(100)
    },
    ip: {
        type: Sequelize.STRING(100)
    },
    browser: {
        type: Sequelize.STRING(100)
    },
    sistem: {
        type: Sequelize.STRING(100)
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
})

module.exports = Ip
