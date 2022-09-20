const Sequelize = require('sequelize')
const database = require('../../database/index')


const MuralCurtida = database.define('muralCurtida', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true        
    },
    mural_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,        
    }
},
{timestamps: false})

module.exports = MuralCurtida
