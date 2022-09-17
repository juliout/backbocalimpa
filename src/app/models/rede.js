const Sequelize = require('sequelize')
const database = require('../../database/index')
const User = require('./user')
const Social = require('./social')

const Rede = database.define('rede', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    contact: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    actived: {
        type : Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '1'
        
    }
},{timestamps: false})

Rede.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})
Rede.belongsTo(Social, {
    constraint: true,
    foreignKey: 'social_id',
    onDelete: 'CASCADE',
})

module.exports = Rede;
