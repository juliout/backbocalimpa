const Sequelize = require('sequelize')
const database = require('../../../database/index')
const Selected = require('./selected')
const Message = require('./message')
const Service = require('./service')

const Pessoa = database.define('pessoa', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(255),
    },
    wpp: {
        type: Sequelize.BIGINT(20),
    },
    datanascimento: {
        type: Sequelize.DATE
    },
    genero: {
        type: Sequelize.STRING(255)
    },
    actived: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
},{timestamps: false})

Pessoa.hasOne(Selected, {
    foreignKey: 'pessoa_id',
})
Selected.belongsTo(Pessoa, {
    constraint: true,
    foreignKey: 'pessoa_id',
    onDelete: 'CASCADE',
})

Pessoa.hasOne(Message, {
    foreignKey: 'pessoa_id',
})
Message.belongsTo(Pessoa, {
    constraint: true,
    foreignKey: 'pessoa_id',
    onDelete: 'CASCADE',
})

Pessoa.hasMany(Service, {
    foreignKey: 'pessoa_id',
})
Service.belongsTo(Pessoa, {
    constraint: true,
    foreignKey: 'pessoa_id',
    onDelete: 'CASCADE',
})

module.exports = Pessoa;
