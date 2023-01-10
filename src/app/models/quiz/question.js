const Sequelize = require('sequelize')
const database = require('../../../database/index')
const Answer = require('./answer')
const Alternative = require('./alternative')
const Selected = require('./selected')

const Question = database.define('question', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    query: {
        type: Sequelize.STRING(255),
    },
    type: {
        type: Sequelize.STRING(255),
    }
},{
    timestamps: false,
})

Question.hasMany(Alternative, {
    foreignKey: 'question_id',
})
Alternative.belongsTo(Question, {
    constraint: true,
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
})

Question.hasOne(Answer, {
    foreignKey: 'question_id',
})
Answer.belongsTo(Question, {
    constraint: true,
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
})

Question.hasMany(Selected, {
    foreignKey: 'question_id',
})
Selected.belongsTo(Question, {
    constraint: true,
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
})




module.exports = Question;
