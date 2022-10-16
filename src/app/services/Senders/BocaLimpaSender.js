const {create, Client} = require('@open-wa/wa-automate')

module.exports = async() => {
    return await create({
        sessionId: 'boca-Limpa',
        cacheEnabled: false,
        qrTimeout: 0,
        headless: true,
        licenseKey: "EA0B8545-F00B4289-B6145C0C-09F2D796"
    }).then(client=> {
        return client
    })
}
  