const Sequelize = require('sequelize')
const database = require('../../database/index')

const Membro = database.define('membro', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    number: {
        type: Sequelize.BIGINT(14),
    },
    actived: {
        type: Sequelize.BOOLEAN
    },
    groups_id:{
        type: Sequelize.STRING(100),
        allowNull: false,
        foreignKey: true
    },
    entry: {
        type: Sequelize.STRING(45)
    },
    exit: {
        type: Sequelize.STRING(45)
    },
    
},{timestamps: false})

module.exports = Membro;
