const Sequelize = require('sequelize')
const database = require('../../database/index')

const Group = database.define('Group', {
    id: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(45),
    },
    invite: {
        type: Sequelize.STRING(150)
    },
    members:{
        type: Sequelize.NUMBER,

    },
},{timestamps: false})

module.exports = Group;