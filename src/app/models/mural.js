const Sequelize = require('sequelize')
const database = require('../../database/index')
const Comentario = require('./comentario')
const MuralCurtida = require('./muralCurtida')

const Mural = database.define('mural', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
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
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey:  true
    }
})

Mural.hasMany(Comentario)
Comentario.belongsTo(Mural, {
    constraint: true,
    foreignKey: Mural.id,
    onDelete: 'CASCADE',
})

Mural.hasOne(MuralCurtida)
MuralCurtida.belongsTo(Mural, {
    constraint: true,
    foreignKey: 'mural_id',
    onDelete: 'CASCADE',
})

module.exports = Mural
