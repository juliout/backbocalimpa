const userModel = require('../app/models/user')
const TimeModel = require('../app/models/horario')
//const SenderBocaLimpa = require('../app/services/Senders/bocaLimpa.js')

module.exports = async () =>{

    let dateNow = new Date()
    dateNow = dateNow.toLocaleTimeString('pt-br',{ timeZone: 'America/Sao_Paulo'})

        const findTime = await TimeModel.findAll({where : {time: dateNow}, include: userModel}).catch(err => {
            console.error(err.message)
        })
        if (!findTime) return

        findTime.map(async (time) => {
            if (time.actived === false) return
            if (time.user.actived === false) return

            let tel = time.user.tel
            let name = time.user.name

            await SenderBocaLimpa.sendText(`55${tel}@c.us`, `Olá ${name}, Lembrete! Está na hora de escovar seus dentes`)}).then((result)=>{}).catch((erro)=>{console.error(erro)})
}