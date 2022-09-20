const Sequelize = require('sequelize')
const database = require('../../database/index')
const ComentarioCurtida = require('./comentarioCurtida')

const Comentario = database.define('comentario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING(255),
    },
    mural_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    }
});

Comentario.hasOne(ComentarioCurtida, {
    foreignKey: 'comentario_id',
})
ComentarioCurtida.belongsTo(Comentario, {
    constraint: true,
    foreignKey: 'comentario_id',
    onDelete: 'CASCADE',
})

module.exports = Comentario
