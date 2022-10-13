const Sequelize = require('sequelize')
const database = require('../../database/index')
const Resultado = require('./resultado')

const Loteria = database.define('loterias', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(45),
        actived: Sequelize.BOOLEAN
    },
    actived: {
        type: Sequelize.BOOLEAN
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    rede_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    }
},{timestamps: false})

Loteria.hasOne(Resultado, {
    foreignKey: 'loteria_id',
})
Resultado.belongsTo(Loteria, {
    constraint: true,
    foreignKey: 'loteria_id',
    onDelete: 'CASCADE',
})

module.exports = Loteria;
