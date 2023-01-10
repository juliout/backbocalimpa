const app = require('../app2')
const axios = require('axios')
const https = require('https')

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`server on na porta ${process.env.PORT}`)
})

//  async function action() {await axios({url: 'http://servicebus2.caixa.gov.br/portaldeloterias/api/duplasena', method:'GET',httpsAgent: new https.Agent({
//   rejectUnauthorized: false
// })}).then(res => console.log(res.data)).catch(e=>console.log({message: e.message}))}
//   action()
