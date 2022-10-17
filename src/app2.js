require('dotenv').config()
const cors = require('cors')
const express = require('express')

class AppController {
  constructor() {
    this.express = express()
    this.express.use(cors())

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(express.json())
  }

  routes() {
    this.express.use(require('./routes/routes'))
  }
}

module.exports = new AppController().express