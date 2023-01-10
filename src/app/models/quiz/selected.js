const Sequelize = require('sequelize')
const database = require('../../../database/index')

const Selected = database.define('selected', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    query: {
        type: Sequelize.STRING(255),
    },
    question_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
    },
    pessoa_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
    }
},{
    timestamps: false,
    tableName: 'selecteds'
})

module.exports = Selected;
