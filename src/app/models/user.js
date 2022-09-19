const Sequelize = require('sequelize')
const database = require('../../database/index')
const MuralCurtida = require('./muralCurtida')
const Mural = require('./mural')
const Comentario = require('./comentario')
const ComentarioCurtida = require('./comentarioCurtida')
const Ip = require('./ip')
const Horario = require('./horario')
const Rede = require('./rede')

const User = database.define('user', {
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
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    tel: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    actived: {
        type : Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '1'
    },
    datanascimento: {
        type: Sequelize.DATE,
    },
    uf:{
        type: Sequelize.STRING(45),
    },
    cidade:{
        type: Sequelize.STRING(45)
    },
    genero: {
        type: Sequelize.STRING(45)
    },
    nickname: {
        type: Sequelize.STRING(45)
    },
    image: {
        type: Sequelize.STRING(100)
    }
})
User.hasOne(MuralCurtida)
MuralCurtida.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasOne(Mural)
Mural.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasOne(Comentario)
Comentario.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasOne(ComentarioCurtida)
ComentarioCurtida.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasOne(Ip)
Ip.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasMany(Horario)
Horario.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasMany(Rede)
Rede.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

module.exports = User
