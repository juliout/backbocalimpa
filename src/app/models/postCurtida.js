const Sequelize = require('sequelize')
const database = require('../../database/index')


const PostCurtida = database.define('postCurtida', {
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
    post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,        
    }
},
{timestamps: false})

module.exports = PostCurtida
