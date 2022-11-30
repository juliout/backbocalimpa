const axios = require('axios')

class Testes {
    async xml(req,res){
        try {
            
            let header = {
                authorization : 'Basic ' + btoa('bfcombr22:9cA.tHRtY/nW[Ynx')
            }
            console.log(header)
            const resposta = await axios.get('https://api.zoom.com.br/zoomapi/search/query/offers?=',{headers: header}).catch(e=> {throw new Error(e)})

            res.status(200).send(resposta.data.product)
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: error.message})
        }
    }
}

module.exports = new Testes()