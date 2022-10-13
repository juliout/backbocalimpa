const Loteria = require('../models/loteria')
const Resultado = require('../models/resultado')
const UserModel = require('../models/user')

class AlarmeSorteController {
    async Allloterias (req, res) {
        try {
            let userid = req.userId
            let {id} = req.body
            const acharLoterias = await Loteria.findAll({where:{user_id: userid}, include:{model: Resultado}}).catch(e=>{
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
}

module.exports= new AlarmeSorteController()