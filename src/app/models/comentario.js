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

module.exports = Comentario
