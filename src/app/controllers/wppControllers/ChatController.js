const {Api} = require('../../Api')
const ServerWpp = require('../../../server/ServerWpp')
const Pessoa = require('../../models/quiz/pessoa')
const Question = require('../../models/quiz/question')
const Answer = require('../../models/quiz/answer')
const Alternatives = require('../../models/quiz/alternative')
const Selected = require('../../models/quiz/selected')
const Service = require('../../models/quiz/service')
const { Op } = require('sequelize')
const validadeDate = require('../../../helper/validateDate')
const botmenu = require('../../../helper/Wpp/bot_Menu')
const getSigns = require('../../../helper/getSigns')
const reverseDate = require('../../../helper/ReverseDate')

function clearText(texto){
    let text = texto
    text = text.toLowerCase().replace(/[^\w\s]/gi, '')
    return text 
}

const ChatWpp = async (Client) => {
    try {
        const user = await Client
        await user.onMessage (async message => {
            // pega o texto enviado pelo usuario e remove qualquer coisa
            // e deixa apenas letras
        let text = message.body
        text = text.toLowerCase().replace(/[^\w\s]/gi, '')
            // busca todas as mensagens mandadas pelo usuario
        let bodyMessage = await user.loadAndGetAllMessagesInChat(message.from, true, false)
            // busca o usuario no banco de dados
        const userModel = await Pessoa.findOne({where: {wpp: message.from}, include:[{model: Service}]}).catch(err=> err.message)
            //busca as perguntas no banco de dados junto as alternativas
        
        if(userModel) {
            
            let ArMenu = () => {
                let aux = '*Olá! Digite o numero para escolher o bot que você quer ativar.*'
                botmenu.forEach( opc => {
                    aux += `\n${opc.id} - ${opc.query} `
                })
                return aux
            }
            let menu = ArMenu()
            if(text === 'menu'){
                await user.sendText(message.from, menu)
            }
            if(text ==='limpar'){
                await user.clearChat(message.from)
            }

            if(bodyMessage.length>2){
                    //aqui vc abre a segunda lista, apos selecionar a opção no menu principal
                    if(clearText(bodyMessage[bodyMessage.length-3].body) === 'menu'){
                        let body1 = message.body
                        botmenu.forEach( async bot => {
                            if(body1 === bot.id){
                                let rows = []
                                let title = `${bot.subMsg ? bot.subMsg : bot.query }`
                                let submenu = [{
                                    rows: rows,
                                    title: title
                                }]
                                if(bot.list){
                                    bot.list.forEach(list => {
                                        rows.push(
                                            {
                                                rowId: list.id,
                                                title: list.query
                                            }
                                        )
                                    })
                                    await user.sendListMessage(message.from, submenu, bot.msg, 'Clique abaixo nas opções e selecione!', 'clique aqui')
                                }else if(bot.horoscopo) {
                                    await user.sendListMessage(message.from, 
                                        [
                                            {
                                                rows:[{
                                                        rowId : '1',
                                                        title : 'Horoscopo'
                                                    }],
                                                    title: 'clice na mensagem para inciar o cadastro'
                                            }
                                        ], bot.msg, 'Clique abaixo nas opções e selecione!', 'clique aqui')                                   
                                }else {
                                    await user.sendText(message.from,'Desculpe esse Setor esta em construção.\nAcesse o menu novamente!')
                                }
                                
                            }
                        })
                    }
                
                    // aqui abre a terceira lista
                
                    if(bodyMessage.length>=5){
                        if(bodyMessage[bodyMessage.length-5].body.toLowerCase() === 'menu'){
                            let body1 = message.body
                            botmenu.forEach( async bot => {
                                if(message.body.toLowerCase() === 'não'|| message.body.toLowerCase()=== 'menu') {
                                    return await user.sendText(message.from, 'Okay, volte quando quiser!!')
                                } 
                                if(bot.verify) {
                                    if(userModel.services){
                                        return userModel.services.forEach(async ser => {
                                            if (ser.name === 'rodizio' && ser.actived === true){
                                                return await user.sendText(message.from, 'você ja participa desse serviço')
                                            }
                                        })
                                    }
                                }
                                if(bot.id === bodyMessage[bodyMessage.length-3].body) {
                                    if(bot.list){
                                        bot.list.forEach(async lquery => {
                                            if(body1 === lquery.query) {
                                                let rows = []
                                                let title = lquery.msg
                                                let submenu = [{
                                                    rows: rows,
                                                    title: title
                                                }]
                                                if(lquery.list){
                                                    lquery.list.forEach(q=>{
                                                        rows.push({
                                                            rowId: ' ',
                                                            title: q.choice
                                                        })
                                                    })
                                                    await user.sendListMessage(message.from, submenu, lquery.msg, 'Clique abaixo nas opções e selecione!', 'clique aqui')
                                                }else {
                                                    return
                                                }                                            
                                            }
                                        })
                                    }else{
                                        return
                                    }
                                }
                            })
                        }
                    }
                
                    // aqui abre a lista caso confirmação
                if(bodyMessage.length>=6){
                    let opt = bodyMessage[bodyMessage.length-5].body
                    let servic = bodyMessage[bodyMessage.length-3].body
                    let choice = message.body
                    if(bodyMessage.length> 6) {
                        botmenu.forEach( async bot => {
                            if(bodyMessage[bodyMessage.length-7].body.toLowerCase() === 'menu' && bot.id === opt){
                                if(bot.list) {
                                    bot.list.forEach(async lquery => {
                                        if(servic.toLowerCase() === lquery.query.toLowerCase()){
                                            lquery.list.forEach(async list =>{
                                                if(choice.toLowerCase() === list.choice){
                                                    if (list.message) {
                                                        await user.sendText(message.from, list.message)
                                                    }else if (list.iniciar) {
                                                        await user.sendText(message.from, list.iniciar)
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }else {
                                    return
                                }
                            }
                        })
                    }
                }
            }
            //seleciona as resposta do usuario
            const selecionados = await Selected.findAll({where: {pessoa_id: userModel.id}, attributes: ['question_id']})
            // aqui é a funcao que pega o array dos ids das respostas e seleciona a primeira pergunta que nao seja esses ids, determina o tipo tmb
            const pertArray = async (array, tipo) => { 
                if(array.length>0) {
                    return await Question.findOne({where : {type: tipo, [Op.not]: {id : array}}, include:[{model: Alternatives}]})
                } else {
                    return await Question.findOne({where : {type: tipo}, include:[{model: Alternatives}]})
                }
            }
            //aqui separa os ids que o usuario ja responderam
            var arraySelect = []
            if(selecionados){
                selecionados.map(select=>{
                    arraySelect.push(select.question_id)
                })
            }
            ////////// PARTE DE PERGUNTAS horoscopo
            const perguntaHoroscopo = await pertArray(arraySelect, 'horoscopo')

            if(perguntaHoroscopo){
                if(text === 'horoscopo' && clearText(bodyMessage[bodyMessage.length-5].body) === 'menu' && bodyMessage.length> 4) {
                    
                    let genAlt = ''
                    if(perguntaHoroscopo.alternatives.length > 0){
                        const {alternatives} = perguntaHoroscopo
                        alternatives.map(alt=> {
                            genAlt += `\n${alt.query}`
                        })
                        await user.sendText(message.from, `*${perguntaHoroscopo.query}*`)
                        await user.sendText(message.from, genAlt)
                    }else {
                        await user.sendText(message.from, `*${perguntaHoroscopo.query}*`)
                    }
                
                }
                if(text === 'sim' && message.quotedMsg.list && message.quotedMsg.list.title === '*Proxima Pergunta?*'){
                    let genAlt = ''
                    if(perguntaHoroscopo.alternatives.length > 0){
                        const {alternatives} = perguntaHoroscopo
                        alternatives.map(alt=> {
                            genAlt += `\n${alt.query}`
                        })
                        await user.sendText(message.from, `*${perguntaHoroscopo.query}*`)
                        await user.sendText(message.from, genAlt)
                    }else {
                        await user.sendText(message.from, `*${perguntaHoroscopo.query}*`)
                    }
                }
                //
                if (bodyMessage.length > 2) {
                    if(bodyMessage[bodyMessage.length-2].body === `*${perguntaHoroscopo.query}*`) {
                        if(message.body === 'menu'){
                            return
                        }
                        if (bodyMessage[bodyMessage.length-2].body === `*Data de Nascimento: (DD/MM/AAAA)*`) {
                            const validacao = validadeDate(message.body)
                            if(validacao){
                                if(validacao === 'data invalida'){
                                    return await user.sendText(message.from, 'Data invalida, volte ao menu e refaça sua incrição')
                                }else {
                                    let sign = validacao.split('-').reverse()
                                    let final = `${sign[0]}/${sign[1]}/${sign[2]}`
                                    let signo = getSigns(sign[0], sign[1])
                                    if(signo) {
                                        await user.sendText(message.from, `Okay, seu Signo é *${signo}*,\nea data do seu nacimento é ${final}`)
                                        await user.sendListMessage(message.from, 
                                            [
                                                {
                                                    rows:[
                                                            {
                                                                rowId : '1',
                                                                title : 'Sim'
                                                            },
                                                            {
                                                                rowId : '1',
                                                                title : 'Não'
                                                            }
                                                        ],
                                                        title: 'confirme sua ação'
                                                }
                                            ], 'Correto?', 'selecione a opção que deseja ou volte ao menu.', 'clique aqui')
                                    }
                                }
                            }
                        }
                        if(bodyMessage[bodyMessage.length-2].body === '*Qual é o seu nome completo?*'){
                            await user.sendText(message.from,`seu nome é '${text}'`)
                            await user.sendListMessage(message.from, 
                                [
                                    {
                                        rows:[
                                                {
                                                    rowId : '1',
                                                    title : 'Sim'
                                                },
                                                {
                                                    rowId : '1',
                                                    title : 'Não'
                                                }
                                            ],
                                            title: 'confirme sua ação'
                                    }
                                ], 'Correto?', 'selecione a opção que deseja ou volte ao menu.', 'clique aqui')
                        }
                    }
                    if(bodyMessage[bodyMessage.length-3].body === `*${perguntaHoroscopo.query}*`){
                        if(text === 'masculino'){
                            await user.sendText(message.from, 'seu sexo é Masculino')
                            await user.sendListMessage(message.from, 
                                [
                                    {
                                        rows:[
                                                {
                                                    rowId : '1',
                                                    title : 'Sim'
                                                },
                                                {
                                                    rowId : '1',
                                                    title : 'Não'
                                                }
                                            ],
                                            title: 'confirme sua ação'
                                    }
                                ], 'Correto?', 'selecione a opção que deseja ou volte ao menu.', 'clique aqui')
                        }
                        if(text === 'feminino'){
                            await user.sendText(message.from, 'seu sexo é Feminino')
                            await user.sendListMessage(message.from, 
                                [
                                    {
                                        rows:[
                                                {
                                                    rowId : '1',
                                                    title : 'Sim'
                                                },
                                                {
                                                    rowId : '1',
                                                    title : 'Não'
                                                }
                                            ],
                                            title: 'confirme sua ação'
                                    }
                                ], 'Correto?', 'selecione a opção que deseja ou volte ao menu.', 'clique aqui')
                        }
                        if(text === 'não quero informa'){
                            await user.sendText(message.from, 'não deseja informar seu sexo')
                            await user.sendListMessage(message.from, 
                                [
                                    {
                                        rows:[
                                                {
                                                    rowId : '1',
                                                    title : 'Sim'
                                                },
                                                {
                                                    rowId : '1',
                                                    title : 'Não'
                                                }
                                            ],
                                            title: 'confirme sua ação'
                                    }
                                ], 'Correto?', 'selecione a opção que deseja ou volte ao menu.', 'clique aqui')
                        }
                    }
                }
                if(text === 'sim' && message.quotedMsg.list && message.quotedMsg.list.title === 'Correto?'){
                    if(bodyMessage[bodyMessage.length-5].body === '*Data de Nascimento: (DD/MM/AAAA)*'){
                        const salvarNascimento = await Pessoa.update(
                            {
                                datanascimento: reverseDate(bodyMessage[bodyMessage.length-4].body,'/')
                            },{
                                where: {id: userModel.id}
                            }).catch(async err=> await user.sendText(message.from, err.message))
                        if(salvarNascimento){
                            const selectNasc = await Selected.create(
                                {
                                    pessoa_id: userModel.id,
                                    question_id: 12,
                                    query: bodyMessage[bodyMessage.length-4].body
                                }
                                ).catch(err=> console.log(err))
                            if(!selectNasc) return
                            await user.sendListMessage(message.from, 
                                [
                                    {
                                        rows:[
                                                {
                                                    rowId : '1',
                                                    title : 'Sim'
                                                },
                                                {
                                                    rowId : '1',
                                                    title : 'Não'
                                                }
                                            ],
                                            title: 'confirme sua ação'
                                    }
                                ], '*Proxima Pergunta?*', 'selecione a opção que deseja ou volte ao menu.', 'clique aqui')
                        }else{
                            return
                        }
                    }

                    if(bodyMessage[bodyMessage.length-6].body === '*Qual o seu gênero?*') {
                        const salvarGenero = await Pessoa.update(
                            {
                                genero: bodyMessage[bodyMessage.length-4].body.toLowerCase()
                            },{
                                where: {id: userModel.id}
                            }).catch(async err=> await user.sendText(message.from, err.message))
                        if(!salvarGenero) return
                        const selectGen = await Selected.create(
                            {
                                pessoa_id: userModel.id,
                                question_id: 13,
                                query: bodyMessage[bodyMessage.length-4].body
                            }
                            ).catch(err=> console.log(err))
                        if(!selectGen) return
                        await user.sendListMessage(message.from, 
                            [
                                {
                                    rows:[
                                            {
                                                rowId : '1',
                                                title : 'Sim'
                                            },
                                            {
                                                rowId : '1',
                                                title : 'Não'
                                            }
                                        ],
                                        title: 'confirme sua ação'
                                }
                            ], '*Proxima Pergunta?*', 'selecione a opção que deseja ou volte ao menu.', 'clique aqui')
                    }
                    if(bodyMessage[bodyMessage.length-5].body === '*Qual é o seu nome completo?*') {
                        const salvarNome = await Pessoa.update(
                            {
                                name: bodyMessage[bodyMessage.length-4].body
                            },{
                                where: {id: userModel.id}
                            }).catch(async err=> await user.sendText(message.from, err.message))
                            if(!salvarNome) return
                            const selecName = await Selected.create(
                                {
                                    pessoa_id: userModel.id,
                                    question_id: 14,
                                    query: bodyMessage[bodyMessage.length-4].body
                                }
                                ).catch(err=> console.log(err))
                            if(!selecName) return
                            await user.sendText(message.from, 'essa foi a ultima pergunta, você sera cadastrado e recebera mensagens do seu horoscopo no zap')
                                await Service.create({
                                    name: 'horoscopo',
                                    actived: true,
                                    pessoa_id: userModel.id
                                })
                        }  
                }
                if(message.body.toLowerCase() === 'não' && message.quotedMsg.list && message.quotedMsg.list.title === 'Correto?' ) {
                    await user.sendText(message.from, 'Tudo bem, a resposta não foi salva. acesse o menu e responda novamente.')
                }
            }else if (text === 'horoscopo' && !perguntaHoroscopo){
                user.sendText(message.from, 'você ja é Cadastrado nesse sistema.\nAcesse o menu novamente')
            }
            ////////AQUI COMEÇA RODIZIO

            const perguntaRodizio = await pertArray(arraySelect, 'rodizio')

            if(perguntaRodizio) {
                if(message.quotedMsg && message.quotedMsg.list.title === perguntaRodizio.query){
                    let rodizio;
                    
                    if(message.body === '1 ou 2'){
                        rodizio = 'segunda-feira'
                    }
                    if(message.body === '3 ou 4'){
                        rodizio = 'terça-feira'
                    }
                    if(message.body === '5 ou 6'){
                        rodizio = 'quarta-feira'
                    }
                    if(message.body === '7 ou 8'){
                        rodizio === 'quinta-feira'
                    }
                    if(message.body === '9 ou 0'){
                        rodizio === 'sexta-feira'
                    }
                    let mensagemRodizio = `Ok, seu rodízio acontece toda *${rodizio}*. Enviaremos 3 alertas pra você: um no dia anterior e outros dois no dia do rodízio, 30 minutos antes do início do horário de restrição. 
                    Se quiser alterar os horários ou cancelar os alertas, acrescentar mais veículos para receber os lembretes e conhecer outras opções de serviço complete seu cadastro, defina uma senha e acesse a interface administrativa no endereço www.alertarodizio.org. aproveita que é tudo grátis!
                    `
                    const userRodizio = await Service.create({
                        pessoa_id: userModel.id,
                        name: 'rodizio',
                        query: rodizio,
                        actived : true

                    }).catch(async err=> {
                        return await user.sendText(message.from, err.message)
                    })
                    if(!userRodizio) return
                    return await user.sendText(message.from, mensagemRodizio)
                }
            }


            ////////////////////// PARTE DO QUIZ COMEÇA AQ//////////////////////////////
           
            
            
            const perguntasQuiz = await pertArray(arraySelect, 'futebol')
           
            const resposta = await Answer.findOne({where: {question_id: perguntasQuiz.id}})
            let alternative = ''
    
            perguntasQuiz.alternatives.map(alt=>{
                return alternative += `\n${alt.query}`
            })

            if(text === 'quiz' && clearText(bodyMessage[bodyMessage.length-5].body) === 'menu'){
                if(!perguntasQuiz) {
                    return await user.sendText(message.from, 'Não tenho mais perguntas para você, tente outra momento !!!')
                }
                let lista = '*O quiz será De conhecimentos de futebol:* ⚽\n'
                await user.sendText(message.from, lista)
                await user.sendText(message.from, 'AHH, Para passar de pergunta,\ndigite SIM para avançar ou Pausar, para sair do quiz!\n')
                let mensagem = `*${perguntasQuiz.query}*\n`
                await user.sendText(message.from, mensagem)
                return await user.sendText(message.from, alternative)
            }

            if (message.body.toLowerCase() === 'sim') {
                if(bodyMessage[bodyMessage.length-2].body.toLowerCase() === '*podemos ir para proxima pergunta?*'){
                    let mensagem = `*${perguntasQuiz.query}*\n`
                    await user.sendText(message.from, mensagem)
                    await user.sendText(message.from, alternative)
                }
                if(bodyMessage[bodyMessage.length-3].body === 'Deseja realmente sair do sistema?'){
                    await user.sendText(message.from, 'você saiu!!!! ainda em teste')
                }
            }
            
            if (message.body.toLowerCase() === 'não') {
                if(bodyMessage[bodyMessage.length-2].body.toLowerCase() === '*podemos ir para proxima pergunta?*'){
                    await user.clearChat(message.from)
                }
            }
            
            if(bodyMessage.length > 2){
                if(bodyMessage[bodyMessage.length-3].body === `*${perguntasQuiz.query}*`){
                    if(message.body.toLowerCase() === resposta.query){
                        await user.sendText(message.from, 'você acertou!!, Parabéns!!\n')
                        await user.sendText(message.from, '*Podemos ir para proxima pergunta?*')
                        await Selected.create({
                            pessoa_id: userModel.id,
                            question_id: perguntasQuiz.id,
                            query: resposta.query
                        })
                    }else if(text === 'pausar' || text === 'menu'){
                        await user.clearChat(message.from)
                    }else{
                        await user.sendText(message.from, 'você errou 😭, digite Quiz e tente novamente!!!!')
                    }
                }
            }
            /////////////////// PARTE DO QUIZ TERMINA AQUI //////////////////

            // if(text.toLowerCase() === 'sair'){
            //     if(bodyMessage[bodyMessage.length-2].body=== 'menu'){
            //         await user.sendText(message.from,'Deseja realmente sair do sistema?')
            //         return await user.sendText(message.from,'Sim para sair\nCancelar para cancelar a saida')
            //     } else {
            //         await user.sendText(message.from, 'Para Sair do nosso sistema, digite menu e acesse a opção Sair')
            //     }
            // }

        }else {
        /////////// parte de cadastrar começa aq

        let title = 'Digite a Opção desejada:'
        let menu = `
                    \n*${title}*
                    ${!userModel ? '\n\nCadastrar' : ''}
                    `

        if(text === 'menu'){
            await user.sendText(message.from, menu)
        }
        if(text === 'cadastrar'){
           if(!userModel){
            await user.sendText(message.from, '*lembre de não digitar nada alem do seu nome*')
            await user.sendText(message.from, '*digite o seu nome:*')
           }
        }

        if(bodyMessage[bodyMessage.length-4]){
            if(bodyMessage[bodyMessage.length-4].body.toLowerCase() === 'cadastrar' && !userModel){
                const respostaApi = await Api.post('/quiz/cadastrarpessoa',{
                    name: message.body,
                    wpp: message.from
                }).catch(err=>console.log(err.message))
                if(respostaApi.status === 201) {
                    await user.sendText(message.from, `Parabéns ${respostaApi.data.name}!, você foi cadastrardo, acesso o menu novamente!`)
                }
            }
        }

        ////////// parte de cadastrar termina aqui
    }
        
        })
    } catch (error) {
        console.log(error.message)
    }
}
ChatWpp(ServerWpp())


