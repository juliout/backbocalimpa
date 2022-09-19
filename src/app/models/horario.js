const Sequelize = require('sequelize')
const database = require('../../database/index')

const Horario = database.define('horario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    time: {
        type: Sequelize.TIME(3),
        allowNull: true
    },
    actived: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '1'
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    rede_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
},
{timestamps: false})
module.exports = Horario
