const GroupModel = require('../../models/group')

module.exports.SaveGroup = async (Client) => {
    try {
            const group = await (await Client).getAllGroups()
                if(group) {
                    group.forEach(async g =>{ 

                        const invite = await(await Client).getGroupInviteLink(g.id).catch(e=>{return})

                        if(invite) {
                            let id = g.id.split('@')[0]
                            let name = g.groupMetadata.desc.split(' ')[0]
                            let members = g.groupMetadata.participants.length
                            let user = {
                                id,
                                name,
                                invite,
                                members
                            }
                            console.table(user)
                            const GroupFind = await GroupModel.findOne({where: {id: id}})
                            if (GroupFind) {
                                await GroupModel.update({
                                    invite, 
                                    members
                                }, {where: {id: id}})
                            }else {
                                await GroupModel.create(user)
                            }

                        }else{ return }
                    })
                }
        
    } catch (e) {
        return console.log(e.message)
    }
}

module.exports.AllGroupsApi = async(req, res) => {
    try {
        await GroupModel.findAll({order:[['members', 'DESC']]}).then(all=> {
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
        await GroupModel.findOne({order:[['members', 'ASC']]}).then(one=> {
            return res.status(200).json({invite : one.invite})
        })
    } catch (e) {
        return res.status(400).json({message: e.message})
    }
}