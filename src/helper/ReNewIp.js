const axios = require('axios')

module.exports = async (value) => {
    let rest = value.split('')
    rest.map((r, index) => {
        if(r === ':') {
            rest = rest.slice(index)
        }
    })
    rest = rest.join('')
    const response = await axios.get(`http://ip-api.com/json/${rest}`)

    return (response.data)
}
