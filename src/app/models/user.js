const Sequelize = require('sequelize')
const database = require('../../database/index')
const PostCurtidaModel = require('./postCurtida')
const Post = require('./post')
const Comentario = require('./comentario')
const ComentarioCurtida = require('./comentarioCurtida')
const Ip = require('./ip')
const Horario = require('./horario')
const Rede = require('./rede')
const Loteria = require('./loteria')
const PostCurtida = require('./postCurtida')
const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(255),
       
    },
    email: {
        type: Sequelize.STRING(255),
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    tel: {
        type: Sequelize.STRING(255),
        
    },
    actived: {
        type : Sequelize.BOOLEAN,
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
    },
    rede: {
        type: Sequelize.STRING(100)
    }
})

User.hasOne(PostCurtida,{
    foreignKey: 'user_id',
})
PostCurtida.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasMany(Post,{
    foreignKey: 'user_id'
})
Post.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasMany(Comentario, {
    foreignKey: 'user_id',
})
Comentario.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasOne(ComentarioCurtida,{
    foreignKey: 'user_id',
})
ComentarioCurtida.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasOne(Ip, {
    foreignKey: 'user_id',
})
Ip.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasMany(Horario,{
    foreignKey: 'user_id',
})
Horario.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasMany(Rede,{
    foreignKey: 'user_id',
})
Rede.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

User.hasMany(Loteria,{
    foreignKey: 'user_id',
})
Loteria.belongsTo(User, {
    constraint: true,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

module.exports = User
