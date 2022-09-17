const Sequelize = require('sequelize')
const database = require('../../database/index')
const User = require('./user')
const Mural = require('./mural')

const MuralCurtida = database.define('muralCurtida', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

MuralCurtida.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})
MuralCurtida.belongsTo(Mural, {
    constraint: true,
    foreignKey: 'mural_id',
    onDelete: 'CASCADE',
})

module.exports = MuralCurtida
