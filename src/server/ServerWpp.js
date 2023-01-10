const baseServerWpp = require('../app/services/Senders/BocaLimpaSender')
const UserClient = baseServerWpp()
module.exports = async ()=> {
    return await UserClient
}