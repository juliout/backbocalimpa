const PostModel = require('../models/post')
const PostCurtidaModel = require('../models/postCurtida')
const ComentarioModel = require('../models/comentario')
const ComentarioCurtidaModel = require('../models/comentarioCurtida')
const UserModel = require('../models/user')

class ForumController {
//criação de post/mural da comunidade
    async CreatePost(req, res) {
        try {
            let {title, text, user_id, type, link} = req.body

            if(!title || !text ||!user_id) throw new Error ('todos os dados devem ser preenchidos')
            let postObj = {
                title : title,
                text : text,
                user_id: user_id,
                verified: 0,
                type: type,
                link: link
            }
            const post = await PostModel.create(postObj).catch(e=>{throw new Error(e.message)})
            if(!post) throw new Error('Não foi possivel Criar o post')

            res.status(201).json({message: 'Postagem criada'})
        } catch (error) {
            return res.status(400).json({message: error.message})
        }

    }
//achar todos os posts/mural da comunidade
    async FindAllPosts(req, res) {
        try {
            let {limit} = req.body

            if (limit) {
                const post = await PostModel.findAll({limit: limit, order:[['id', 'DESC']], include:[
                    {model: UserModel,attributes:['email', 'name', 'genero', 'cidade', 'datanascimento']},
                    {model:PostCurtidaModel},
                    {model:ComentarioModel,include:[{model:ComentarioCurtidaModel},{model:UserModel,attributes:['name']}]},
                ]}).catch(e=> {
                    throw new Error(e.message)
                })
                res.status(200).json(post)
            }else {
                const post = await PostModel.findAll({order:[['id', 'DESC']], include:[
                    {model: UserModel,attributes:['email', 'name', 'genero', 'cidade', 'datanascimento']},
                    {model:PostCurtidaModel},
                    {model:ComentarioModel,include:[{model:ComentarioCurtidaModel},{model:UserModel,attributes:['name']}]},
                ]}).catch(e=> {
                    throw new Error(e.message)
                })
                res.status(200).json(post)
            }
        
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: error.mensagem})
        }

    }
    async FindPost(req, res) {
        try {
            let {id} =req.body
            const post = await PostModel.findOne({where:{id}, include:[
                {model: UserModel,attributes:['email', 'name', 'genero', 'cidade', 'datanascimento']},
                {model:PostCurtidaModel},
                {model:ComentarioModel,include:[{model:ComentarioCurtidaModel},{model:UserModel,attributes:['name']}]},
            ]}).catch(e=>{
                throw new Error(e.message)
            })
            res.status(200).json(post)
        } catch (error) {
            return res.status(400).json({message: error.mensagem})
        }
    }

    async CurtidaPost(req, res) {
        try {
            let {post_id, user_id} = req.body
            
            if(!post_id || !user_id) throw new Error('todos os dados devem ser preenchidos')

            let curtidaObj = {
                post_id : post_id,
                user_id : user_id,
            }
            const findCurtida = await PostCurtidaModel.findOne({where:{ post_id: post_id, user_id: user_id}})
            if (findCurtida) {
                await PostCurtidaModel.destroy({where: {post_id: post_id, user_id: user_id}})
                .then(resp=>{
                    return res.status(200).json({message: 'descurtido'})
                })
                .catch(e=> { throw new Error(e.message) })
            } else {
                await PostCurtidaModel.create(curtidaObj).then(resp=> {
                    return res.status(200).json({message: 'curtido'})
                }).catch(e=>{ throw new Error(e.message) })
            }
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    }
    async FindComentario (req, res) {
        try {
            let {id} = req.body

            const findComentario = await ComentarioModel.findOne({where: {id}, include: [
                {model : ComentarioCurtidaModel},
                {model:UserModel,attributes:['name']}]}).catch(e=> {
                throw new Error(e.message)
            })
            
            return res.status(200).json(findComentario)
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: error.message})
        }
    }
    async CreateComentario(req, res) {
        try {
            let {text, user_id, post_id} = req.body

            let comentarioObj = {
                text: text,
                user_id: user_id,
                post_id: post_id
            }

            await ComentarioModel.create(comentarioObj).then(resp=> {
                return res.status(201).json({message: 'comentario criado'})
            }).catch(e=> {throw new Error(e.message)})
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    }
    async CurtidaComentario(req, res) {
        try {
            let {user_id, comentario_id} = req.body

            let curtidaObj = {
                user_id: user_id,
                comentario_id: comentario_id
            }

            const curtida = await ComentarioCurtidaModel.findOne({where: curtidaObj})
            if(curtida) {
                await ComentarioCurtidaModel.destroy({where: curtidaObj}).then(()=> {
                    return res.status(200).json({message: 'descurtido'})
                }).catch(e=> {throw new Error(e.message)})
                                
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