require('dotenv').config()
const automateSend = require('../helper/automateSend')
const cron = require('node-cron')
//const Sender = require('../app/services/Sender')


const customExpress = require('./../app.js')

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


cron.schedule('*/60 * * * * *', automateSend)