const Loteria = require('../models/loteria')
const Rede = require('../models/rede')
const Resultado = require('../models/resultado')
const UserModel = require('../models/user')

class AlarmeSorteController {
    async Allloterias (req, res) {
        try {
            let userid = req.userId
            let {id} = req.body
            const acharLoterias = await Loteria.findAll({where:{user_id: userid},order:[['name', 'ASC']], include:{model: Resultado}}).catch(e=>{
                throw new Error(e.message)
            })
             
            res.status(200).json(acharLoterias)
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    }

    async AboutUser(req, res) {
        try {
            let userid = req.userId

            const acharUsuario = await UserModel.findOne({where:{id:userid}, attributes:['name', 'email', 'datanascimento', 'genero', 'tel']})

            res.status(200).json(acharUsuario)
            
        } catch (error) {
            return res.status(400).json({message: error.mesage})
        }
    }
    
    async AttLoterias(req,res){
        try {
            let id = req.userId
            const user = await UserModel.findOne({where: {id, rede:'alerta-da-sorte'}})
            const rede = await Rede.findOne({where: {user_id: user.id}})
            const loterias = await Loteria.findAll({where:{user_id: user.id, rede_id:rede.id}})
            .catch(e=>console.error(e.message))

            let dados = req.body
            loterias.forEach(async element => {
                dados.forEach(async dado=> {
                    if(dado.nome === element.name) {
                        await Loteria.update({
                            actived: dado.actived,
                        },{where: {user_id: element.user_id, rede_id: element.rede_id, name:element.name}})
                        .catch(e=>console.error(e.message))
                        let objresultado = {
                            resultado: dado.resultado,
                            apostas: dado.aposta
                        }
                        await Resultado.update(objresultado,{where: {loteria_id: element.id}}).catch(e=>console.error(e.message))
                    }else{
                        return
                    }
                })
            });

            res.status(200).json({message: 'atualizado'})
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    }

    async AttUser(req,res) {
        try {
            let id = req.userId
            let {name, genero, datanascimento,email,password,tel} = req.body
            
            let obj = {
                name,
                genero,
                datanascimento,
                email,
                password,
                tel
            }

            if(!name) delete obj.name
            if(!genero) delete obj.genero
            if(!datanascimento) delete obj.datanascimento
            if(!email) delete obj.email
            if(!password) delete obj.password
            if(!tel) delete obj.tel

            await UserModel.update(obj,{where: {id}}).then(resposta=>console.log('atulizou'))
            .catch(e=>{throw new Error (e.message)})
                            
            res.status(200).json({message: 'Atualizado com sucesso'})
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({message: error.message})
        }
    }

    async Desativar(req, res) {
        try {
            let id = req.userId

            const user = await UserModel.findOne({where:{id, rede: 'alerta-da-sorte'}})
            if(!user) throw new Error('usuario não acha')

            await UserModel.update({
                actived: false
            },{where:{id, rede: 'alerta-da-sorte'}}).then(s=>{
                return res.status(200).json({message: 'Desabilitado'})
            }).catch(er=>{
                throw new Error(er.message)
            })
        } catch (error) {
            return res.status(200).json({message: error.message})
        }
    }



}

module.exports= new AlarmeSorteController()