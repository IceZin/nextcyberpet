export class Ws {
    ws: WebSocket;
    events: {
        [key: string]: {
            [key: string]: Function
        }
    };

    constructor() {
        this.events = {};
        this.connect();
        setInterval(() => {
            if (this.ws.readyState == WebSocket.CLOSED) this.connect();
        }, 5000);
    }

    connect() {
        const ip = window.location.host;

        console.log(ip);

        this.ws = new WebSocket(`ws://${ip}/`, ["WsClient"])

        this.ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);

            if (data.type == 0x0) {
                this.sendJSON({
                    type: 0x0
                })
            } else {
                if (this.events[data.channel]?.data != null)
                    this.events[data.channel]?.data(data.data);
            }
        }
    }

    sendJSON(data) {
        this.ws.send(JSON.stringify(data))
    }

    on (window: string, type: string, event: Function) {
        if (this.events[window] == undefined) this.events[window] = {};
        this.events[window][type] = event;
    }
}