const Sequelize = require('sequelize')
const database = require('../../database/index')
const User = require('./user')
const Rede = require('./rede')

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
    }
},
{timestamps: false})

Horario.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})
Horario.belongsTo(Rede, {
    constraint: true,
    foreignKey: 'rede_id',
    onDelete: 'CASCADE',
})

module.exports = Horario
