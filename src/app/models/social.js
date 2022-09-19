const Sequelize = require('sequelize')
const database = require('../../database/index')
const Rede = require('./rede')

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

Social.hasOne(Rede)
Rede.belongsTo(Social, {
    constraint: true,
    foreignKey: 'social_id',
    onDelete: 'CASCADE',
})
module.exports = Social
