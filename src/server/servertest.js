const app = require('../app2')
//const automateSend = require('../helper/automateSend')
//const cron = require('node-cron')
//const BocaLimpa = require('../app/services/Senders/bocaLimpa')
//const MundoAnimal = require('../app/services/Senders/mundoAnimal')

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`server on na porta ${process.env.PORT}`)
})

