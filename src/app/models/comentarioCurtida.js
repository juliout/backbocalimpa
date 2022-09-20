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
    },
    comentario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
},
{timestamps: false});

module.exports = ComentarioCurtida
