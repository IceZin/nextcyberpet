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
            console.log(data);
            if (data[0] == 0x0) this.awaitingPing = false;
            else if (this.events["data"] != undefined) this.events["data"](data);
        });

        this.sock.on('error', (err) => {
            console.log(err);
        })

        this.pingTimeout = setTimeout(this.ping.bind(this), this.pingTime);

        this.syncTime();
    }

    syncTime() {
        let timeRaw = new Date();
        let time = [];

        timeRaw.toLocaleTimeString().split(':').map(value => {
            time.push(parseInt(value));
        })

        this.sendBuffer(Buffer.from([0x1, 0x5, 0x1, 0x3, time[0], time[1], time[2]]))
    }

    addFeedTime(timeRaw, foodAmount, waterFlowTime, state) {
        let time = [];

        timeRaw.split(':').map(value => {
            time.push(parseInt(value));
        })

        let foodBuff = [];
        while (foodAmount >= 255) {
            foodBuff.push(0xff);
            foodAmount -= 255;
        }
        if (foodAmount > 0) foodBuff.push(foodAmount);

        this.sendBuffer(
            Buffer.from(
                [0x1, 0x7 + foodBuff.length, 0x1, 0x0,
                time[0], time[1], state, waterFlowTime,
                foodBuff.length, ...foodBuff]
            )
        )
    }

    removeFeedTime(timeRaw) {
        let time = [];

        timeRaw.split(':').map(value => {
            time.push(parseInt(value));
        })

        this.sendBuffer(
            Buffer.from(
                [0x1, 0x4, 0x1, 0x1,
                time[0], time[1]]
            )
        )
    }

    editFeedTime(OTRaw, NTRaw, WFT, FA) {
        let OT = [];

        OTRaw.split(':').map(value => {
            OT.push(parseInt(value));
        })

        let NT = [];

        NTRaw.split(':').map(value => {
            NT.push(parseInt(value));
        })

        let foodBuff = [];
        while (FA >= 255) {
            foodBuff.push(0xff);
            FA -= 255;
        }
        if (FA > 0) foodBuff.push(FA);

        this.sendBuffer(
            Buffer.from(
                [0x1, 0x8 + foodBuff.length, 0x1, 0x2,
                OT[0], OT[1], NT[0], NT[1], WFT,
                foodBuff.length, ...foodBuff]
            )
        )
    }

    setFeedTimeState(timeRaw, state) {
        let time = [];

        timeRaw.split(':').map(value => {
            time.push(parseInt(value));
        })

        this.sendBuffer(
            Buffer.from(
                [0x1, 0x6, 0x1, 0x4, 0x2,
                time[0], time[1], state]
            )
        )
    }

    toggleFeedOption(option, state) {
        this.sendBuffer(
            Buffer.from(
                [0x1, 0x4, 0x1, 0x4, option, state]
            )
        )
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