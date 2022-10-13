const sequelize = require('sequelize')
const Sequelize = require('sequelize')
const database = require('../../database/index')
const Horario = require('./horario')
const Loteria = require('./loteria')

const Rede = database.define('rede', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
        
    },
    contact: {
        type: Sequelize.STRING(255),
        unique: true
    },
    actived: {
        type : Sequelize.BOOLEAN,
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

Rede.hasOne(Horario, {
    foreignKey: 'rede_id',
})
Horario.belongsTo(Rede, {
    constraint: true,
    foreignKey: 'rede_id',
    onDelete: 'CASCADE',
})

Rede.hasMany(Loteria,{
    foreignKey: 'rede_id',
})
Loteria.belongsTo(Rede, {
    constraint: true,
    foreignKey: 'rede_id',
    onDelete: 'CASCADE',
})


module.exports = Rede;
