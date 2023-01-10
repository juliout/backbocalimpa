const Alternative= require('../models/quiz/alternative')
const Pessoa = require('../models/quiz/pessoa')
const Answer = require('../models/quiz/answer')
const Question = require('../models/quiz/question')
const Selected = require('../models/quiz/selected')


module.exports.CadastrarPergunta = async (req, res) => {
    try {
        const {query, type, alternative, resposta} = req.body

        let obj = {
            query,
            type
        }

        const CreateQuestion = await Question.create(obj)
            .catch(err => {
                throw new Error(err.message)
            })

        if(CreateQuestion) {
            if(alternative){
                alternative.forEach(async alt => {
                    await Alternative.create({
                        query: alt,
                        question_id: CreateQuestion.id
                    }).catch(err=> {
                        throw new Error(err.message)
                    })
                })
            }
            if(resposta){
                await Answer.create({
                    query: resposta,
                    question_id: CreateQuestion.id
                })
            }

            const created = await Question.findOne({
                where: {id: CreateQuestion.id},
                include: [
                    {model: Alternative},
                    {model: Answer}
                ]
            })

            return res.status(200).json(created)
        }

        if(!create) throw new Error('não foi possivel Criar a pergunta')
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
}

module.exports.CadastrarPessoa = async (req, res) => {
    try {
        let {name, wpp} = req.body

        wpp = wpp.replace(/\D/g, "")
        
        let obj = {
            name,
            wpp
        }
        const create = await Pessoa.create(obj).catch(err=>console.log(err.message))
        if(!create) throw new Error('não foi possivel criar esse Usuario')
        
        return res.status(201).json(create)

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports.CadastrarSelected = async (req, res) => {
    try {
        let {wpp, question, resposta} = req.body
        wpp = wpp.replace(/\D/g, "")

        const usuario = await Pessoa.findOne({where: { wpp: wpp }})
            .catch(err => {throw new Error(err.message)})

        const pergunta = await Question.findOne({where: {query: question}})
            .catch(err => {throw new Error(err.message)})

        if(usuario && pergunta) {

            const findresposta = await Selected.findOne({
                where:{ 
                            pessoa_id: usuario.id,
                            question_id: pergunta.id
                        }
            })
            if(findresposta) throw new Error('você ja respondeu a essa pergunta')

            const createSelect = await Selected.create({
                pessoa_id : usuario.id,
                question_id: pergunta.id,
                query: resposta
            })
            .catch(err => {throw new Error(err.message)})
            if(!createSelect)throw new Error('não foi possivel criar a selecao')

            return res.status(201).json(createSelect)
        }
        throw new Error('não foi possivel crirar algo')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}


