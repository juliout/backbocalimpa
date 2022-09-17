const Sequelize = require('sequelize')
const database = require('../../database/index')

const Social = database.define('social', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
    }
},{timestamps: false})
module.exports = Social
