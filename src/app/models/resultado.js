const Sequelize = require('sequelize')
const database = require('../../database/index')

const Resultado = database.define('resultado', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    resultado: {
        type: Sequelize.BOOLEAN
    },
    apostas: {
        type: Sequelize.BOOLEAN
    },
    loteria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true 
    }
},{timestamps: false})

module.exports = Resultado;
