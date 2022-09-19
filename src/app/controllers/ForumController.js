const MuralModel = require('../models/mural')
const MuralCurtidaModel = require('../models/muralCurtida')
const ComentarioModel = require('../models/comentario')
const ComentarioCurtidaModel = require('../models/comentarioCurtida')

class ForumController {

    async CreateMural(req, res) {

        try {
            let {title, text, id} = req.body
            
            if(!title || !text ||!id) throw new Error ('todos os dados devem ser preenchidos')
            let muralObj = {
                title : title,
                text : text,
                user_id: id,
                verified: 0
            }
            const mural = await MuralModel.create(muralObj).catch(e=>{throw new Error(e.message)})
            if(!mural) throw new Error('Não foi possivel Criar o mural')

            res.status(200).json({message: 'mural Criado'})
        } catch (error) {
            return res.status(400).json({message: error.message})
        }

    }

    async FindAllMural(req, res) {
        try {
            const mural = await MuralModel.findAll({include: {model: MuralCurtidaModel}})
            console.log(mural)
            res.status(200).json(mural)
        } catch (error) {
            return res.status(400).json({message: error.mensagem})
        }

    }

    async CurtidaMural(req, res) {
        try {
            let {mural_id, user_id} = req.body
            
            if(!mural_id || !user_id) throw new Error('todos os dados devem ser preenchidos')

            let curtidaObj = {
                mural_id : mural_id,
                user_id : user_id,
            }
            const findCurtida = await MuralCurtidaModel.findOne({where:{ mural_id: mural_id, user_id: user_id}})
            if (findCurtida) {
                await MuralCurtidaModel.destroy({where: {mural_id: mural_id, user_id: user_id}})
                .then(resp=>{
                    return res.status(200).json({message: 'descurtido'})
                })
                .catch(e=> { throw new Error(e.message) })
            } else {
                await MuralCurtidaModel.create(curtidaObj).then(resp=> {
                    return res.status(200).json({message: 'curtido'})
                }).catch(e=>{ throw new Error(e.message) })
            }

            res.status(200).json({message: 'curtida criada!'})
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    }

    async CreateComentario(req, res) {
        try {
            let {text, user_id, mural_id} = req.body

            let comentarioObj = {
                text: text,
                user_id: user_id,
                mural_id: mural_id
            }
            console.log(comentarioObj)

            await ComentarioModel.create(comentarioObj).then(resp=> {
                return res.status(200).json({message: 'comentario criado'})
            }).catch(e=> {throw new Error(e.message)})
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    }
    async CurtidaComentario(req, res) {
        try {
            let {user_id, mural_id} = req.body

            let curtidaObj = {
                user_id: user_id,
                mural_id: mural_id
            }

            const curtida = await ComentarioCurtidaModel.findOne({where: curtidaObj})
            if(curtida) {
                await ComentarioCurtidaModel.destroy({where: curtidaObj})                
            } else {
                await ComentarioCurtidaModel.create(curtidaObj).then(resp=> {
                    return res.status(200).json({message: 'curtido'})
                }).catch(e=>{throw new Error(e.message)})
            }
        } catch (error) {
            return res.status(400).json({message: error.mensagem})
        }
    }
}
module.exports = new ForumController()