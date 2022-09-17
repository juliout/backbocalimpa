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
        type: Sequelizee.STRING(100)
    },
    sistem: {
        type: Sequelize.STRING(100)
    }
  
})

Ip.belongsTo(User, {
    constraint: true,
    foreignKey: 'users_id',
    onDelete: 'CASCADE',
})

module.exports = Ip
