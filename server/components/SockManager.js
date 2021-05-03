class WsManager {
    constructor(sock, req, cookies) {
        this.events = {};
        this.pingTimeout = null;
        this.lossTimer = null;
        this.pingTime = 1000;
        this.maxLoss = 10;
        this.packetLoss = 0;
        this.awaitingPing = false;
        this.sock = sock;

        this.sock.on('data', (data) => {
            if (data[0] == 0x0) this.awaitingPing = false;
            else if (this.events["data"] != undefined) this.events["data"](data);
        });

        this.sock.on('error', (err) => {
            console.log(err);
        })

        this.pingTimeout = setTimeout(this.ping.bind(this), this.pingTime);

        setInterval(() => {
            this.sendBuffer(Buffer.from([0x1, 0x2, 0x2, 0xf]))
        }, 10000);
    }

    sendBuffer(buff) {
        this.sock.write(buff);
    }

    clearTimeouts() {
        if (this.lossTimer) clearTimeout(this.lossTimer);
        if (this.pingTimeout) clearTimeout(this.pingTimeout);
    }

    ping() {
        if (!this.awaitingPing) {
            try {
                this.sock.write(Buffer.from([0x0]));
            } catch (error) {
                console.log(error)
            }

            this.awaitingPing = true;

            this.pingTimeout = setTimeout(() => {
                if (this.awaitingPing) {
                    this.toggleTimer();

                    this.packetLoss++;
                    this.awaitingPing = false;

                    if (this.packetLoss >= this.maxLoss) {
                        if (this.events['end'] != null) this.events['end']();
                        this.sock.end();
                    } else {
                        this.ping();
                    }
                } else {
                    this.ping();
                }
            }, this.pingTime);
        }
    }

    toggleTimer() {
        if (this.lossTimer != null) {
            clearTimeout(this.lossTimer);
            this.lossTimer = null;
        }

        this.lossTimer = setTimeout(() => {
            this.packetLoss = 0;
        }, this.maxLoss * this.pingTime);
    }

    on(event, callback) {
        this.events[event] = callback;
    }
}

module.exports = WsManager;