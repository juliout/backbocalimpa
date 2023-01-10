const Sequelize = require('sequelize')
const database = require('../../../database/index')

const Anternative = database.define('alternative', {
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
    }
},{timestamps: false})

module.exports = Anternative;
