const Sequelize = require('sequelize')
const database = require('../../../database/index')

const Service = database.define('service', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(255),
    },
    query: {
        type: Sequelize.STRING(255)
    },
    actived:{
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    pessoa_id: {
        type: Sequelize.INTEGER,
        foreignKey: true
    }
},{
    timestamps: false,
    tableName: 'Services'
})

module.exports = Service;
