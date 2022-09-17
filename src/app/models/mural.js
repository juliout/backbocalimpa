const Sequelize = require('sequelize')
const database = require('../../database/index')
const User = require('./user')

const Mural = database.define('mural', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(55),
    },
    text: {
        type: Sequelize.STRING(255)
    },
    verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0'
    }
})

Mural.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

module.exports = Mural
