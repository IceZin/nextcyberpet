class TimeManager {
    constructor() {
        this.startDate = new Date();
        this.startTime = Date.now();

        this.info = []

        this.startDate.toLocaleDateString().split('/').map(value => {
            this.info.push(parseInt(value));
        })

        this.startDate.toLocaleTimeString().split(':').map(value => {
            this.info.push(parseInt(value));
        })

        console.log(this.info);
    }

    checkType(time) {
        if (time < 1000) return 'ms';
        time /= 1000; 

        if (time < 60) return 's';
        time /= 60;

        if (time < 60) return 'min';
        time /= 60;

        if (time < 24) return 'hour';
        time /= 24;

        return undefined;
    }

    difference(time) {
        return this.startTime - time;
    }

    newInterval(callback, ms) {
        let timeType = this.checkType(ms);

        let timeInfo = new Date().toLocaleTimeString().split(':');

        console.log("Time now " + Date.now().toLocaleString());

        if (timeType == 'min') {
            let min = Math.floor(ms / 1000 / 60);
            let triggerTime = undefined;
            let check = false;

            for (let i = 0; i < 60 / min; i++) {
                if (i * min > parseInt(timeInfo[1])) {
                    triggerTime = i * min;
                    check = true;
                    break;
                }
            }

            if (check) {
                let timeout = (triggerTime - parseInt(timeInfo[1])) * 60 * 1000;

                setTimeout(() => {
                    callback();

                    setInterval(() => {
                        callback();
                    }, ms);
                }, timeout);
            } else {
                let timeout = (60 - parseInt(timeInfo[1])) * 60 * 1000;

                setTimeout(() => {
                    callback();

                    setInterval(() => {
                        callback();
                    }, ms);
                }, timeout);
            }
        }
    }
}

module.exports = TimeManager;