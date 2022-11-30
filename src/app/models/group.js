const Sequelize = require('sequelize')
const database = require('../../database/index')
const Membro = require('./membro')

const Group = database.define('Group', {
    id: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(45),
    },
    invite: {
        type: Sequelize.STRING(150)
    },
    members:{
        type: Sequelize.NUMBER,

    },
    updated: {
        type: Sequelize.STRING(100)
    }
},{timestamps: false})

Group.hasMany(Membro, {
    foreignKey: 'groups_id',
})

Membro.belongsTo(Group, {
    constraint: true,
    foreignKey: 'groups_id',
    onDelete: 'CASCADE',
})

module.exports = Group;
