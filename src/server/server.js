require('dotenv').config()
//const automateSend = require('../helper/automateSend')
const Sender = require('../app/services/Senders/BocaLimpaSender')
const cron = require('node-cron')
const customExpress = require('./../app.js')
const {SaveGroup} = require('../app/controllers/wppControllers/BlackFridayController')

var fs = require("fs")
var http = require("http")
var https = require("https")

var port = 3030

var options = {
	key: fs.readFileSync(__dirname + '/../../certificates/bocalimpa.bigdates.com.br.key','utf8'),
	cert: fs.readFileSync(__dirname + '/../../certificates/bocalimpa.bigdates.com.br.crt', 'utf8')
}

    const app = customExpress()

    var server = https.createServer(options, app).listen(port, function () {
      console.log("Express server listening on port " + port)
    })

    
  // const Client = Sender()

  // cron.schedule('*/10 * * * *', async ()=>{
  //   SaveGroup(Client)
  // })