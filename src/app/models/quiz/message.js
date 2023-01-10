const Sequelize = require('sequelize')
const database = require('../../../database/index')

const Message = database.define('message', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    msg: {
        type: Sequelize.STRING(255),
    },
    pessoa_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
    }
},{
    timestamps: false,
})

module.exports = Message;
