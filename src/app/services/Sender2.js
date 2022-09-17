const { create, Whatsapp, SocketState} = require('venom-bot')

class Sender {

        client = Whatsapp
        connected;
        qr;

        get isConnected() {
            return this.connected
        }
        get qrCode() {
            return this.qr
        }

    constructor() {
        this.inicialize()
    }

    async sendText(to, body) {
       await this.client.sendText(to, body)
    }

    inicialize() {
        const qr = (urlCode) => {
            this.qr = { urlCode }
        }
        const status = (statusSession) => {
            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(statusSession)
        }

        const start = (client) => {
            this.client = client

            client.onStateChange((state) => {
                this.connected = state === SocketState.CONNECTED
            })            
        }

        create('session-escovar', qr, status, {puppeteerOptions: {args: ['--no-sandbox', '--disable-setuid-sandbox']}}).then((client) => {
            start(client)
        }
        ).catch(error => console.log(error))
    }
}

module.exports = new Sender()