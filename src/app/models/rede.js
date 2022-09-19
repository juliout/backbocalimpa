const Sequelize = require('sequelize')
const database = require('../../database/index')
const Horario = require('./horario')

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
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true        
    },
    social_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true        
    },
},{timestamps: false})

Rede.hasOne(Horario)
Horario.belongsTo(Rede, {
    constraint: true,
    foreignKey: 'rede_id',
    onDelete: 'CASCADE',
})

module.exports = Rede;
