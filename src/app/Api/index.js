const axios = require('axios')
module.exports.Api = axios.create({
    baseURL: 'http://localhost:3030'
})
