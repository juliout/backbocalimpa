const Sequelize = require('sequelize')
const database = require('../../database/index')
const Comentario = require('./comentario')
const PostCurtida = require('./postCurtida')

const Post = database.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING(55),
    },
    text: {
        type: Sequelize.STRING(255)
    },
    verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0'
    },
    type: {
        type: Sequelize.STRING(100) 
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey:  true
    }
})

Post.hasMany(Comentario, {
    foreignKey: 'post_id'
})
Comentario.belongsTo(Post, {
    constraint: true,
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
})

Post.hasMany(PostCurtida,{
    foreignKey: 'post_id',
})
PostCurtida.belongsTo(Post, {
    constraint: true,
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
})

module.exports = Post
