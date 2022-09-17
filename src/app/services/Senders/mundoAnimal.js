const {create, Client} = require('@open-wa/wa-automate')

class Sender2 {

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
            sessionId: 'mundo-animal',
            cacheEnabled:false,
            qrTimeout: 0,
            headless: true,
        }).then(async client => {
	await start(client)
	const hostAccountNumber = await client.getHostNumber()
	console.log('host account', hostAccountNumber )
	})

    }
}

module.exports = new Sender2()