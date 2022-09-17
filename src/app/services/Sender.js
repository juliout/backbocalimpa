const {create, Client} = require('@open-wa/wa-automate')

class Sender {

    client = Client

    constructor() {
        this.inicial()
    }

    async sendText(to, body) {
        await this.client.sendText(to, body)
    }

    inicial() {

        const start = async (client) => {
            this.client = client
        }

        create({
            sessionId: 'boca-Limpa',
            cacheEnabled:false,
            qrTimeout: 0,
            headless: true,
            licenseKey: "EA0B8545-F00B4289-B6145C0C-09F2D796"
        }).then(async client => {
	await start(client)
	const hostAccountNumber = await client.getHostNumber()
	console.log('host account', hostAccountNumber )
	})

    }
}

//module.exports = new Sender()