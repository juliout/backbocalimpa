const GroupModel = require('../../models/group')
const MembroModel = require('../../models/membro')
const {Op} = require('sequelize')
const datenow = require('../../../helper/timenow')

module.exports.SaveGroup = async (Client) => {
    try {
        //localiza todos os grupos de wpp que a sessao participa
        const group = await (await Client).getAllGroups()
        
        if(group) {
            group.map(async g =>{
                
                // havendo grupo ele gera um link de convite, mas a sessao precisa ser Adiministador do grupo, para poder gerar o link
                let invite = await(await Client).getGroupInviteLink(g.id).catch(e=>{return})
                //
                let id = g.id.split('@')[0] // separa o numero do usuario, colocando-o no id.
                let name = g.groupMetadata.desc.split(' ')[0] // separa do nome do grupo que esta no inicio da descricao do grupo, iguais aos outro (nome)
                let members = g.groupMetadata.participants.length //pega a quantidade das listas.
                //havendo invite, ele faz a separacaoo do membro
                if(invite) {
                    //objeto do usuario.
                    let user = {
                        id,
                        name,
                        invite,
                        members,
                        updated: datenow()
                    }
                    // caso ache um grupo que ja esteja criado, ele atualiza os dados,
                    // como a quantidade de membros, um invite novo,
                    // e a hora que foi atualizado(updated)
                    // caso nao ache, ele criara uma nova tabela(linha:52)
                    
                    const GroupFind = await GroupModel.findOne({where: {id: id}})
                    if (GroupFind) {
                        
                        await GroupModel.update({
                            invite, 
                            members,
                            updated: datenow()
                        }, {where: {id: id}}).then(c=>console.log('atualizou', datenow()))
                        // aqui fara a verificacao se os participates ja estao cadastrados 
                        //no participantes, caso nao esteja ele cadastrara
                        g.groupMetadata.participants.map( async element => {
                          const userg = await MembroModel.findOne({where: {number: element.id.user, groups_id: GroupFind.id}})
                          if(!userg) {
                            await MembroModel.create({
                                entry: datenow(),
                                groups_id: GroupFind.id,
                                number: element.id.user,
                                actived: true
                            }).catch(e=>{})
                          }else if (userg.actived === false) {
                            await MembroModel.update({
                                actived: true,
                                entry: datenow(),
                            },{
                                where: {
                                    id: userg.id
                                }
                            }).catch(e=>{throw new Error(e.message)})
                          }
                        });
                        
                    } else {
                        const group = await GroupModel.create(user).catch(e=>console.log(e))
                        if(group) {
                            await MembroModel.create({
                                groups_id: group.id,
                                number: element.id.user,
                                actived: true,
                                entry: datenow(),
                            }).catch(e=>e.message)
                        }else{
                            return
                        }
                    }
                }
                if(g.groupMetadata.pastParticipants) {
                    g.groupMetadata.pastParticipants.map( async (past) => {
                        const findPart = await MembroModel.findOne({where:{groups_id: id, number:past.id.user}})
                        if(!findPart) {
                            await MembroModel.create({
                                entry: datenow(),
                                exit: datenow(),
                                groups_id: id,
                                number: past.id.user,
                                actived: false
                            }).catch(e=>console.log(e))
                        }
                        if(findPart.actived === true) {
                            await MembroModel.update({
                                actived: false,
                                exit: datenow(),
                            },{where: {id: findPart.id}}).catch(e=>{throw new Error(e.message)})
                        }
                    });
                }
            })
        }else {
            return
        }
        
    } catch (e) {
        return console.log(e.message)
    }
}

module.exports.AllGroupsApi = async(req, res) => {
    try {
        await GroupModel.findAll({order:[['members', 'DESC']], include:[
            {model:MembroModel}
        ]}).then(all=> {
            return res.status(200).json(all)
        }).catch(e=>{
            throw new Error(e.message)
        })
    } catch (e) {
        return res.status(400).json({message: e.message})
    }
}

module.exports.InviteGenerator = async(req, res) => {
    try {
        await GroupModel.findOne({where: {members: {[Op.lt]:255}} ,order:[['members', 'DESC']]}).then(one=> {
            return res.status(200).json({invite : one.invite})
        })
    } catch (e) {
        return res.status(400).json({message: e.message})
    }
}