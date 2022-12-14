require('dotenv').config()
const bcrypt = require('bcrypt')
const axios = require('axios')

const UserModel = require('../models/user')
const HorarioModel = require('../models/horario')
const RedeModel = require('../models/rede')
const SocialModel = require('../models/social')
const IpModel = require('../models/ip')
const Loteria= require('../models/loteria')
const Resultado = require('../models/resultado')

const {validationResult} = require('express-validator')

const jwt = require('jsonwebtoken')
const SECRETPASS = 'escovar'

const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('../../config/smtp/smtp')

const AddTime = require('../../helper/AddTime')
const ReverseDate = require('../../helper/ReverseDate')
const ReNewIp = require('../../helper/ReNewIp')


const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.senha
    },
    service: 'outlook'
    
})

//controller para tratar usuario
class UserCotnroller {
        
    //cria um novo Usuario
    async CreateUser(req, res) {
        try {
            let {name, email, tel, password ,datanascimento ,uf ,cidade ,genero ,nickname ,
                image , brekker, lunch, dinner, social, socialContact, rede, loteria} = req.body
                
                console.log(req.body)
            const erros = validationResult(req)
            const salt = 10;

            if (!password ) throw new Error('Todos os campos devem ser preenchidos')

		    const emailUser = await UserModel.findOne({where:{email: email, rede: rede}})
		    if (emailUser) throw new Error ('Email já existente')
            //validaÃ§Ã£o do numero do telefone
            if(tel) {
                tel = tel.replace(/[^0-9]/g, '')
                if (tel[2] !== '9') throw new Error('numero de celular invalido')
                if (tel.length < 10 || tel.length > 11) throw new Error('numero de celular invalido')
            }

            //verificaÃ§Ã£o do email.
            if (!erros.isEmpty()) throw new Error('E-mail invalido')

            //revertendo e verificando data.
            // if(datanascimento) {
            //     if (datanascimento.length > 8) throw new Error('data com formato invalido')
            //     datanascimento = ReverseDate(datanascimento)
            // }

            //senha hash
            password = await bcrypt.hash(password, salt).catch(err=>{throw new Error(err.message)})
            if(!password) throw new Error('nÃ£o foi possivel converter a senha')

            let user = {
                name: name,
                email: email,
                password: password,
                tel: tel,
                datanascimento: datanascimento,
                uf: uf,
                cidade: cidade,
                genero: genero,
                nickname: nickname,
                image: image,
                actived: true,
                rede: rede
            }

            //criacao de usuario
            const createUsuario = await UserModel.create(user)
            if (!createUsuario) throw new Error ('Não foi possivel Criar o usuario!')
            let network;

            if (social){
                if (social === 'whatsapp') {
                    const createSocial = await SocialModel.create({name: 'whatsapp'}).catch(async err=> {
                        await UserModel.destroy({where:{id : createUsuario.id}})
                        throw new Error ('não foi possivel criar a social' + err.message)
                    })
                    network = {
                        name : 'whatsapp',
                        contact : socialContact,
                        actived : true,
                        user_id : createUsuario.id,
                        social_id: createSocial.id
                    }
                }else if (social === 'e-mail') {
                    const createSocial = await SocialModel.create({name: 'email'}).catch(async err=> {
                        await UserModel.destroy({where:{id : createUsuario.id}})
                        throw new Error ('não foi possivel criar a social '+ err.message)
                    })
                    network = {
                        name : 'email',
                        contact : socialContact,
                        actived : true,
                        user_id : createUsuario.id,
                        social_id: createSocial.id
                    }
                }else if (social === 'telegram') {
                    const createSocial = await SocialModel.create({name: 'telegram'}).catch(async err=> {
                        await UserModel.destroy({where:{id : createUsuario.id}})
                        throw new Error ('não foi possivel criar a social '+err.message)
                    })
                    network = {
                        name : 'telegram',
                        contact : socialContact,
                        actived : true,
                        user_id : createUsuario.id,
                        social_id: createSocial.id
                    }
                } else {
                    const createSocial = await SocialModel.create({name: 'whatsapp'}).catch(async err=> {
                        await UserModel.destroy({where:{id : createUsuario.id}})
                        throw new Error ('não foi possivel criar a social ' + err.message)
                    })
                        network = {
                            name : 'whatsapp',
                            contact : tel,
                            actived : true,
                            user_id : createUsuario.id,
                            social_id: createSocial.id
                        }
                }

            }else {
                if (tel) {
                    const createSocial = await SocialModel.create({name: 'whatsapp'}).catch(async err=> {
                        await UserModel.destroy({where:{id : createUsuario.id}})
                        throw new Error ('não foi possivel criar a social ' + err.message)
                    })
                    network = {
                        name : 'whatsapp',
                        contact : tel,
                        actived : true,
                        user_id : createUsuario.id,
                        social_id: createSocial.id
                    }
                }else{
                    const createSocial = await SocialModel.create({name: 'whatsapp'}).catch(async err=> {
                        await UserModel.destroy({where:{id : createUsuario.id}})
                        throw new Error ('não foi possivel criar a social ' + err.message)
                    })
                    network = {
                        name : 'e-mail',
                        contact : email,
                        actived : true,
                        user_id : createUsuario.id,
                        social_id: createSocial.id
                    }
                }
            }
            const redes = await RedeModel.create(network).catch(error => {throw new Error('não foi possivel criar redes :' + error.message)})

            if(!redes) throw new Error('redes não foi criada')

            if(rede === 'bocaLimpa') {

            // adicionando 30minutos ao horario
                if (brekker && lunch && dinner) {
                    brekker = AddTime(brekker)
                    lunch = AddTime(lunch)
                    dinner = AddTime(dinner)
                }

                await HorarioModel.create({
                    name: 'brekker',
                    time : brekker,
                    user_id: createUsuario.id,
                    rede_id: redes.id,
                    actived: true,
                }).catch(async e => {

                    await RedeModel.destroy({where: {user_id: createUsuario.id}})
                    await SocialModel.destroy({where: {id : redes.social_id}})
                    await HorarioModel.destroy({where:{user_id : createUsuario.id}})
                    await UserModel.destroy({where:{id : createUsuario.id}})
                    throw new Error('tabela brekker nÃ£o foi criada'  + e.message)
                })

                await HorarioModel.create({
                    name: 'lunch',
                    time : lunch,
                    user_id: createUsuario.id,
                    rede_id: redes.id,
                    actived :  true
                }).catch(async e => {

                    await RedeModel.destroy({where: {user_id: createUsuario.id}})
                    await SocialModel.destroy({where: {id : redes.social_id}})
                    await HorarioModel.destroy({where:{user_id : createUsuario.id}})
                    await UserModel.destroy({where:{id : createUsuario.id}})
                    throw new Error('tabela lunch nÃ£o foi criada: ' + e.message)
                })

                await HorarioModel.create({
                    name: 'dinner',
                    time : dinner,
                    user_id: createUsuario.id,
                    rede_id: redes.id,
                    actived: true
                }).catch(async e => {

                    await RedeModel.destroy({where: {user_id: createUsuario.id}})
                    await SocialModel.destroy({where: {id : redes.social_id}})
                    await HorarioModel.destroy({where:{user_id : createUsuario.id}})
                    await UserModel.destroy({where:{id : createUsuario.id}})
                    throw new Error('model dinner nÃ£o foi criada'  + e.message)
                })
            }
            if(rede === 'alerta-da-sorte') {
                let allLoterias = ['megasena', 'lotofacil', 'duplasena', 'quina', 'supersete', 'timemania', 'lotomania', 'diadesorte', 'federal', 'loteca', 'milionaria']

                    loteria.map(n => {
                        allLoterias = allLoterias.filter(fil => fil!=n)
                    })

                    allLoterias.map(async lote => {
                        const createLoteria= await Loteria.create({
                            name: lote,
                            actived: 0,
                            user_id: createUsuario.id,
                            rede_id: redes.id
                        }).catch(error=> console.log(error))
                        if(await createLoteria){
                            await Resultado.create({
                                resultado: false,
                                apostas: false,
                                loteria_id: createLoteria.id
                            })
                        }
                    })

                    loteria.forEach(async lote => {
                        const createLoteria= await Loteria.create({
                            name: lote,
                            actived: 1,
                            user_id: createUsuario.id,
                            rede_id: redes.id
                        }).catch(error=> console.log(error))

                        if(await createLoteria){
                            await Resultado.create({
                                resultado: true,
                                apostas: true,
                                loteria_id: createLoteria.id
                            })
                        }
                    })

            }
            // axios.post('https://api.pluga.co/v1/webhooks/MzkxODcyMTUwMDA4MDgwNzQyMVQxNjU2NjEzOTU2', {
            //     nome: name,
            //     sobrenome: '',
            //     email : email,
            //     telefone : tel
            // }).then().catch(err => console.log('não cadastrou'))

            const ReqIp = await ReNewIp(req.ip)


            let IpUser = {}

            if (ReqIp.status !== 'fail') {
                IpUser ={
                    country: ReqIp.country,
                    region: ReqIp.region,
                    regionName : ReqIp.regionName,
                    city: ReqIp.city,
                    zipCode: ReqIp.zip,
                    isp: ReqIp.isp,
                    ip: ReqIp.query,
                    browser: req.body.userAgent,
                    sistem : req.body.plataform,
                    user_id: createUsuario.id
                }

                const registerNewIp = await IpModel.create(IpUser)
                if(registerNewIp) {
                    return res.status(201).json({message : 'Usuario devidamente Cadastrado!'})
                }

            }

            return res.status(201).json({message : 'usuario Criado'})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e.message})
        }
    }

    //Criando Sessao Login
    async Login(req, res) {
        try {
            let { email, password, rede} = req.body
            
            //achar usuario
            const userFind = await UserModel.findOne({ where : { email : email, rede: rede } })
            if (!userFind) throw new Error('Usuario nao encontrado')

            if ( userFind.actived === false ) throw new Error( 'Usuario Esta desativado' ) 
            
            //comparar senhar
            const checkPass = await bcrypt.compare(password, userFind.password).catch(err => { throw new Error('erro ao comaprar a senha')})
            if (!checkPass) throw new Error('Senha errada')
            
            //criar token de autenticaÃ§Ã£o
            const token = jwt.sign({userId: userFind.id}, SECRETPASS, {expiresIn: '24h'})
            if (!token) throw new Error('NÃ£o foi possivel Autenticar')

            let nome = userFind.name.split(' ')
            
            res.status(200).json({
                user : {
                    id : userFind.id,
                    email : userFind.email,
                    name: nome[0],
                    token : token,
                },
                message: 'Login Efetuado!' 
            })
        } catch (e) {
           return res.status(400).json({message : e.message})
        }        
    }
    //Funcao de validar a sessao
    async SessionValidate(req, res) {
        const {id, token} = req.body
	try {
        await jwt.verify(token, SECRETPASS, (err, decoded) => {
            if(err) throw new Error ('nÃ£o autenticado')

            if (id != decoded.userId) {
            throw new Error ('nÃ£o autenticado')
            }

            return res.status(200).json({message: 'SessÃ£o valida'})
        });
	} catch (e) { 
		return res.status(400).json({message: e.message}) 
	}
    }

    async FindUserAll(req, res) {
        let userid = req.userId
        let { id } = req.body
        if (userid !== id) return res.status(400).json({message: 'usuario invalido'})

        try {
            const findUser = await UserModel.findOne({where: {id: userid}})
            if (!findUser) throw new Error('usuario nÃ£o encontrado')
            delete findUser.password

            res.status(200).json(findUser)
        } catch (e) {
            return res.status(400).json({messsage: e.message})
        }
    }

    //pegar horarios do usuario logado
    async AllTimers (req, res) {

        const {id} = req.body
        let userid = req.userId
        try {
            if (userid !== id) throw new Error('usario invalido')
            
            const findHorario = await HorarioModel.findAll({ where : {user_id : id }})
            if (!findHorario) throw new Error('Horarios nÃ£o encontrados') 

            res.status(200).json(findHorario)
            
        } catch (e) { 
            return res.status(400).json({ message : e.message})
        }
    }

    async findTel(req, res) {
        let userid = req.userId
        try {
            const findtel = await UserModel.findOne({where:{id:userid}})
            if(!findtel) throw new Error('não foi possivel achar o usuario')
		
            res.status(200).json({
	tel: findtel.tel,
	email: findtel.email
	
})
        } catch (err) {
            res.status(400).json({message: err.message})
        }

    }

    //atualizar o horario e o telfone
    async AttAll(req, res) {
        try {
            let id = req.userId
            let {  tel, name, email, password, rede} = req.body          

            if(!id) throw new Error('id nÃ£o enviado')

            const User = await UserModel.findOne({where : {id : id, rede: rede}})
            if(!User) throw new Error('NÃ£o foi encontrado usuario')

            const Horario = await HorarioModel.findAll({where : {user_id : id}, include: [{model : UserModel}]})
            if (!Horario) throw new Error('NÃ£o foi encontrado horario ')
            
            if(tel) {
                tel = tel.replace(/[^0-9]/g, '')
                if (tel[2] !== '9') throw new Error('numero de celular invalido')
                if (tel.length < 10 || tel.length > 11) throw new Error('numero de celular invalido')
            }
            let user = {
                name,
                email,
                password,
                tel
            }

            if (!name) delete user.name
            if (!email) delete user.email
            if (!password) delete user.password
            if (!tel) delete user.tel

            const salt = 10;
            if (user.password) user.password = await bcrypt.hash(password, salt).catch(err=> { throw new Error(err.message) })
                        
            if (user) {
                await UserModel.update(user,{where: {id}}).catch(err=>{
                    throw new Error('nao foi possivel atualizar o usuario')
                })
            }
            if(brekker) {
		brekker = AddTime(brekker)
                await HorarioModel.update(
                    { time : brekker},
                    { where : { user_id : id, name : 'brekker'}}
                ).catch(e => {
                    throw new Error('nÃ£o foi possivel attualizar o horario do cafÃ© da manha')
                })
            }
            if(lunch) {
		lunch = AddTime(lunch)
                await HorarioModel.update(
                    { time : lunch},
                    { where : {user_id : id, name : 'lunch' }}
                ).catch(e => {
                    throw new Error('nÃ£o foi possivel attualizar o horario do almoÃ§o')
                })
            }
            if(dinner) {
		dinner = AddTime(dinner)
                await HorarioModel.update(
                    { time : dinner},
                    { where : {user_id: id, name: 'dinner' }}
                ).catch(e => {
                    throw new Error('nÃ£o foi possivel attualizar o horario do Jantar')
                })
            }

            res.status(200).json({message: 'atualizado' })

        } catch (e) {
            return res.status(400).json({message: 'NÃ£o foi Possivel encontrar :' + e.message})
        }
    }
    
    //deletar account
    async DeletAccount(req, res) {
        try {
            const {password, rede, email} = req.body
            //confirmar usuario
            const userFind = await UserModel.findOne({ where : { email: email, id : id, rede:rede} })
            if (!userFind) throw new Error('Usuario nÃ£o encontrado')

            //confirmar Senha
            const checkPass = await bcrypt.compare(password, userFind.password).catch(err =>{ throw new Error('erro ao comparar a senha')})
            if (!checkPass) throw new Error('Senha errada')

            //destroy o horario dps o usuario

            if(rede === 'boca-limpa'){
                
                await HorarioModel.update({actived: 0},{where : {user_id : id}}).then(async () => {
                    await UserModel.update({actived: 0},{where: { id : userFind.id}}).then(()=>{
                        return res.status(200).json({ message: 'Usuario e Horarios desativados' })
                    }).catch(e => {
                        throw new Error('nÃ£o foi possivel deletar o usuario.' + e.message)
                    })
                }).catch(e => {
                    throw new Error('nÃ£o foi possivel deletar o horario.' + e.message)
                })
                         
            }
            if(rede === 'horoscopo'){
                await UserModel.update({actived:0},{where: {id: userFind.id}})
                .then(()=>{
                    return res.status(200).json({ message: 'Usuario desativado' })
                }).catch(e => {
                    throw new Error('nÃ£o foi possivel desativar o usuario.' + e.message)
                })
            }
            if(rede === 'mundo-animal'){

            }
            if(rede === 'alerta-da-sorte') {
                
            }
        } catch (e) {
            return res.status(400).json({message: 'NÃ£o foi Possivel executar : ' + e.message})
        }  
    }
    
    //ativar ou desativar os horarios e atualizar tmb os horarios
    async ActivedTime(req, res) {
            let id = req.userId
            let {name, time, actived} = req.body
        try {   
            
                if (typeof actived !== 'boolean') throw new Error ('Actived is a bollean row')

            if (!time || time === '' || time.length < 4) {
                const timeFind = HorarioModel.update(
                    {actived : actived},
                    { where : {name : name, user_id: id}}
                )
            
                if (!timeFind) throw new Error('NÃ£o foi possivel ativar/desativar o horario')            
                return res.status(200).json({message : `Horario esta ativado/desativado`})
            } else {
                const timeFind = HorarioModel.update(
                    {
                        time : AddTime(time),   
                        actived : actived
                    },
                    { where : {name : name, user_id: id}}
                )
                if (!timeFind) throw new Error('NÃ£o foi possivel ativar/desativar o horario')            
                res.status(201).json({message : `Horario esta ativado/desativado`})
            }

        } catch (e) {
            return res.status(400).json({message: 'Error: ' + e.message})
        }
    }

    //rota para indicar um amigo
    async IndicateFriend(req, res) {
        let {name, tel, site} = req.body
       
        try {
            if(site === 'boca-limpa') {
                site = 'https://bocalimpa.bigdates.com.br/'
            } if (site === 'horoscopo') {

            }
            tel = tel.replace(/[^0-9]/g, '')
            if (tel[2] !== '9') throw new Error('numero de celular invalido')
            if (tel.length < 10 || tel.length > 11) throw new Error('numero de celular invalido')
    
            await Sender.sendText(`55${tel}@c.us`, `OlÃ¡ ${name}, vocÃª foi Indicado a usar nosso Sistema, no site ${site}, acesse e veja nossas funcionalidades. `)
                .then(() => {
                    res.status(200).json({message: 'mensagem enviada com sucesso'})
            }).catch(err => {
                throw new Error('NÃ£o foi possivel Enviar' + err)
            })
        } catch (error) {
            return res.status(400).json({message: `Error: ${error.message}`})
        }
    }
    //rota para confirmar email de senha esquecida e enviar um email
    async ForgotPass(req, res) {
        const { email, rede } = req.body

        try {
            const findUser = await UserModel.findOne({where: { email : email , rede : rede}})
            if (!findUser) throw new Error('NÃ£o foi possivel Encontrar um Usuario com esse Email.')

            const token = jwt.sign({userId: findUser.id}, SECRETPASS, {expiresIn: '10m'})

            if (!token) throw new Error('nÃ£o foi possivel gerar o token')
            let provpass = Math.floor(1000 + Math.random() * 9000);

            const link = `https://bocalimpa.bigdates.com.br/:${process.env.PORT}/resetpass/${findUser.id}/${provpass}/${token}/${rede}`
            let options = {
                text: ` a nova senha Ã© ${provpass}
                click no link para resetar a senha ${link}`,
                subject: 'subject',
                from:'Julio torres <bocalimpaserver@outlook.com>',
                to:`${email}`,
            }

            const response = await transporter.sendMail(options)

            if(!response) throw new Error('mensagem nÃ£o enviada')
            // if (!mailSend) throw new Error('nÃ£o foi possivel enviar o email de recuperaÃ§Ã£o!')

            return res.status(200).json({ message: 'email para reset de senha enviado.'})

        } catch (e) {
            return res.status(400).json({message: `Error : ${e.message}`})
        }

    }

    //rota para resetar
    async ResetPass(req, res) {
        const {id, token, provpass, rede} = req.params
        let salt = 10

        try {
            const findUser = UserModel.findOne({where: {id : id, rede: rede}})
            if (!findUser) throw new Error('usuario nÃ£o encontrado')
            let userId;
            await jwt.verify(token, SECRETPASS,(err,encode)=>{
                if(err){
                    throw new Error(err)
                }
                userId = encode.userId
            })

            if (!provpass) throw new Error('nÃ£o existe senha provisoria')

            const nowPass = await bcrypt.hash(provpass, salt).catch(err=>{throw new Error(err.message)})

            const attUser = UserModel.update({password : nowPass},{where: {id : userId, rede:rede}})

            if (!attUser) throw new Error('NÃ£o foi possÃ­vel atualizar a senha')
            res.redirect('http://127.0.0.1:5500/index.html')

        } catch (e) {
            return res.status(400).json({message: `Error : ${e.message}`})
        }
    }
    
}

module.exports = new UserCotnroller()