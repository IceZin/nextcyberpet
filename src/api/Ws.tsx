export class Ws {
    ws: WebSocket;
    events: {
        [key: string]: {
            [key: string]: Function
        }
    };

    constructor() {
        this.ws = new WebSocket("ws://192.168.0.10:1108/", ["WsClient"])
        
        this.events = {};

        this.ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);

            if (data.type == 0x0) {
                this.sendJSON({
                    type: 0x0
                })
            } else {
                Object.values(this.events).forEach(win => {
                    if (win.data != undefined) win.data(data.data);
                });
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