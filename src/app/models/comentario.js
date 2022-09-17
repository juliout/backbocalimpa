const Sequelize = require('sequelize')
const database = require('../../database/index')
const User = require('./user')
const Mural = require('./mural')

const Comentario = database.define('comentario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING(255),
    }
})

Comentario.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

Comentario.belongsTo(Mural, {
    constraint: true,
    foreignKey: 'mural_id',
    onDelete: 'CASCADE',
})

module.exports = Comentario
