const Sequelize = require('sequelize')
const database = require('../../database/index')
const User = require('./user')
const Comentario = require('./comentario')

const ComentarioCurtida = database.define('comentarioCurtida', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

ComentarioCurtida.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})
ComentarioCurtida.belongsTo(Comentario, {
    constraint: true,
    foreignKey: 'comentario_id',
    onDelete: 'CASCADE',
})

module.exports = ComentarioCurtida
