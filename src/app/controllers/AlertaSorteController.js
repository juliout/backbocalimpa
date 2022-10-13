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
            req.body.forEach(async lote => {

                await loterias.forEach(async elem => {
                    if(elem.name === lote.nome){
                        let objloteria = {
                            name: lote.name,
                            actived: lote.actived,
                            user_id: user.id,
                            rede_id: rede.id
                        }
                        let objresultado = {
                            resultado: lote.resultado,
                            apostas: lote.aposta
                        }
                        await Loteria.update(objloteria,{where: {user_id: elem.user_id, rede_id: elem.rede_id}}).catch(e=>console.error(e.message))
                        await Resultado.update(objresultado,{where: {loteria_id: elem.id}}).catch(e=>console.error(e.message))
                    }
                });
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



}

module.exports= new AlarmeSorteController()