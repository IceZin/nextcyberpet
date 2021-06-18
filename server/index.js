const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs');
const WebSocket = require('ws');
const WsManager = require('./components/WsManager.js');
const SockManager = require('./components/SockManager.js');
const tm = require('./components/TimeManager.js');
const ChannelsManager = require('./components/Channels.js');
const ComplexObject = require('./components/ComplexObject.js')

const TimeManager =  new tm();

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const wss = new WebSocket.Server({ noServer: true });

const Channels = new ChannelsManager();

var client;
var wsClients = {};

// [---] Channels Initialization [---]

const mainInfo = Channels.newChannel("Main", {
    nightMode: false
});
const feedInfo = Channels.newChannel("FoodMonitor", {
    auto: true,
    waterFlow: false
});
const lightInfo = Channels.newChannel("LightMonitor", {
    auto: false,
    light: false,
    spectrum: false,
    mobileAudio: false,
    chartData: []
});
const tempInfo = Channels.newChannel("TempMonitor", {
    autoTempCtrl: false,
    airFlow: false,
    chartData: []
});
const weightInfo = Channels.newChannel("WeightMonitor", {
    maxIdealWeight: undefined,
    minIdealWeight: undefined,
    weightsData: {}
});

console.log(feedInfo);

// [---] Broadcast to Clients [---]

function broadcast(data) {
    console.log(`Broadcasting data to ${data.channel} | ${data.data.option}`)

    Object.values(wsClients).forEach(client => {
        client.sendJSON(data);
    })
}

// [---] Food Monitor Channel [---]
var feedTimes = {}

feedInfo.registerUpdateCallback((option) => {
    broadcast({
        type: 0x1,
        channel: "FeedMonitor",
        data: {
            action: "toggleOption",
            option: option,
            state: feedInfo.getOption(option)
        }
    })
})

const foodMonitorHandler = {
    "toggleFeedTime": (data) => {
        if (feedTimes[data.boxTime] != null) {
            feedTimes[data.boxTime].state = !feedTimes[data.boxTime].state;

            broadcast({
                type: 0x1,
                channel: "FeedMonitor",
                data: {
                    action: "toggleFeedTime",
                    box: {
                        time: data.boxTime,
                        state: feedTimes[data.boxTime].state
                    }
                }
            })

            client.setFeedTimeState(data.boxTime, feedTimes[data.boxTime].state)
        }
    },
    "newFeedTime": (data) => {
        if (feedTimes[data.params.time] != null) return;

        feedTimes[data.params.time] = {
            state: false,
            info: {
                food: data.params.info.food,
                water: data.params.info.water
            }
        }

        broadcast({
            type: 0x1,
            channel: "FeedMonitor",
            data: {
                action: "newFeedTime",
                box: {
                    time: data.params.time,
                    ...feedTimes[data.params.time]
                }
            }
        })

        if (client != null) {
            client.addFeedTime(data.params.time, data.params.info.food, data.params.info.water, false);
        }
    },
    "deleteFeedTime": (data) => {
        if (feedTimes[data.boxTime] != null) {
            delete feedTimes[data.boxTime];

            broadcast({
                type: 0x1,
                channel: "FeedMonitor",
                data: {
                    action: "deleteFeedTime",
                    boxTime: data.boxTime
                }
            })

            if (client != null) {
                client.removeFeedTime(data.boxTime);
            }
        }
    },
    "editFeedTime": (data) => {
        if (feedTimes[data.boxTime] != null) {
            let oldTime = data.boxTime;
            let newTime = data.params.time;

            if (oldTime != newTime) {
                feedTimes[newTime] = {...feedTimes[oldTime]};

                delete feedTimes[oldTime]
            }

            feedTimes[newTime].info.food = data.params.food;
            feedTimes[newTime].info.water = data.params.water;

            broadcast({
                type: 0x1,
                channel: "FeedMonitor",
                data: {
                    action: "editFeedTime",
                    boxTime: oldTime,
                    params: {
                        newTime,
                        food: data.params.food,
                        water: data.params.water
                    }
                }
            })

            client.editFeedTime(oldTime, newTime, data.params.water, data.params.food);
        }
    },
    "toggleOption": (data) => {
        if (feedInfo.options[data.option] != null) {
            feedInfo.setOption(data.option, !feedInfo.options[data.option]);

            if (data.option == "waterFlow") {
                client.toggleFeedOption(0x0, feedInfo.options[data.option]);
            } else if (data.option == "auto") {
                client.toggleFeedOption(0x1, feedInfo.options[data.option]);
            }
        }
    },
    "feedPet": (data) => {
        let foodAmount = data.value;
        let foodBuff = [];

        while (foodAmount >= 255) {
            foodBuff.push(0xff);
            foodAmount -= 255;
        }
        if (foodAmount > 0) foodBuff.push(foodAmount);

        client.sendBuffer(Buffer.from(
            [0x1, 0x3 + foodBuff.length, 0x1, 0x5,
            foodBuff.length, ...foodBuff]
        ));
    }
}

Channels.registerCallback("FoodMonitor", (data) => {
    try {
        foodMonitorHandler[data.action](data);
    } catch (error) {
        
    }
})

// [---] Light Monitor Channel [---]

lightInfo.registerUpdateCallback((option) => {
    broadcast({
        type: 0x1,
        channel: "LightMonitor",
        data: {
            action: "toggleOption",
            option: option,
            state: lightInfo.getOption(option)
        }
    })

    if (option == "light") {
        client.sendBuffer(Buffer.from(
            [0x1, 0x3, 0x0, 0x3, lightInfo.getOption(option)]
        ))
    } else if (option == "spectrum") {
        client.sendBuffer(Buffer.from(
            [0x1, 0x3, 0x0, 0x4, lightInfo.getOption(option)]
        ))
    } else if (option == "mobileAudio") {
        client.sendBuffer(Buffer.from(
            [0x1, 0x3, 0x0, 0x5, lightInfo.getOption(option)]
        ))
    } else if (option == "auto") {
        client.sendBuffer(Buffer.from(
            [0x1, 0x3, 0x0, 0x6, lightInfo.getOption(option)]
        ))
    }
})

const lightMonitorHandler = {
    "toggleOption": (data) => {
        if (lightInfo.options[data.option] != null) {
            lightInfo.setOption(data.option, !lightInfo.options[data.option]);
        }
    },
    "setColor": (data) => {
        let rgb = [];
        let hex = data.color.replace('#', '');
        hex = parseInt(hex, 16);

        for (let i = 0; i < 3; i++) {
            let clr = (hex >> ((2 - i) * 8)) & 255;
            rgb[i] = clr;
        }

        console.log("Setting color");
        console.log(rgb);

        client.sendBuffer(Buffer.from(
            [0x1, 0x5, 0x0, 0x2, ...rgb]
        ))
    }
}

Channels.registerCallback("LightMonitor", (data) => {
    try {
        lightMonitorHandler[data.action](data);
    } catch (error) {
        
    }
})

// [---] Temperature Monitor Channel [---]

var temperatureInfo = []

var sharedTempVars = {
    airFlow: (state) => {
        mainInfo.airFlow = state;

        broadcast({
            type: 0x1,
            channel: "Main",
            data: {
                action: "toggleOption",
                option: "airFlow",
                state
            }
        })
    },
    autoTempCtrl: (state) => {
        mainInfo.airFlow = state;

        broadcast({
            type: 0x1,
            channel: "Main",
            data: {
                action: "toggleOption",
                option: "autoTempCtrl",
                state
            }
        })
    }
}

tempInfo.registerUpdateCallback((option) => {
    try {
        sharedTempVars[option](tempInfo.getOption(option));
    } catch (error) {
        
    }

    broadcast({
        type: 0x1,
        channel: "TempMonitor",
        data: {
            action: "toggleOption",
            option: option,
            state: tempInfo.getOption(option)
        }
    })
})

const tempMonitorHandler = {
    "toggleOption": (data) => {
        if (tempInfo.options[data.option] != null) {
            tempInfo.setOption(data.option, !tempInfo.options[data.option])
        }
    }
}

Channels.registerCallback("TempMonitor", (data) => {
    try {
        tempMonitorHandler[data.action](data);
    } catch (error) {
        
    }
})

// [---] Camera Monitor Channel [---]

const weightMonitorHandler = {
    "toggleOption": (data) => {
        if (camInfo.options[data.option] != null) {
            camInfo.setOption(data.option, !camInfo.options[data.option])
        }
    }
}

Channels.registerCallback("WeightMonitor", (data) => {
    try {
        weightMonitorHandler[data.action](data);
    } catch (error) {
        
    }
})

// [---] Main Channel [---]

var mainRefValsHandler = {
    airFlow: (state) => {
        tempInfo.options.airFlow = state;

        broadcast({
            type: 0x1,
            channel: "TempMonitor",
            data: {
                action: "toggleOption",
                option: "airFlow",
                state
            }
        })
    }
}

const mainHandler = {
    "toggleOption": (data) => {
        if (mainInfo[data.option] != null) {
            mainInfo[data.option] = !mainInfo[data.option];

            if (mainRefValsHandler[data.option] != undefined)
                mainRefValsHandler[data.option](mainInfo[data.option]);

            broadcast({
                type: 0x1,
                channel: data.channel,
                data: {
                    action: "toggleOption",
                    option: data.option,
                    state: mainInfo[data.option]
                }
            })
        }
    }
}

Channels.registerCallback("Main", (data) => {
    try {
        console.log(data);
        mainHandler[data.action](data);
    } catch (error) {
        
    }
})

// [---] Device Data Handler [---]

const dvcFeedManager = {
    0x0: (data) => {
        data.splice(0, 1);
    },
    0x1: (data) => {
        data.splice(0, 1);
    },
    0x2: (data) => {
        data.slice(0, 1);
    }
}

const dvcLightManager = {
    0x0: (data) => {
        data = data.slice(3, data.length);

        console.log("Reached light");
        console.log(data);

        if (lightInfo.options.chartData.length == 10) {
            lightInfo.options.chartData.splice(0, 1);
        }

        let lightLevel = 0;
        for (let i = 0; i < data[2]; i++) lightLevel += data[3 + i];

        lightInfo.options.chartData.push({
            time: [data[0], data[1]],
            lightLevel
        })

        broadcast({
            type: 0x1,
            channel: "LightMonitor",
            data: {
                action: "newLightTime",
                time: `${data[0]}:${data[1]}`,
                lightLevel
            }
        })
    },
    0x1: (data) => {
        data.slice(0, 1);
    },
    0x2: (data) => {
        data.slice(0, 1);
    }
}

const dvcTempManager = {
    0x0: (data) => {
        data = data.slice(3, data.length);

        console.log("Reached temp");
        console.log(data);

        if (tempInfo.options.chartData.length == 10) {
            tempInfo.options.chartData.splice(0, 1);
        }

        tempInfo.options.chartData.push({
            time: [data[0], data[1]],
            temp: data[2] + (data[3] / 10)
        })

        broadcast({
            type: 0x1,
            channel: "TempMonitor",
            data: {
                action: "newTemperatureTime",
                time: `${data[0]}:${data[1]}`,
                value: data[2] + (data[3] / 10)
            }
        })
    },
    0x1: (data) => {
        data.slice(0, 1);
    },
    0x2: (data) => {
        data.slice(0, 1);
    }
}

const dvcWeightManager = {
    0x0: (data) => {
        if (data[3] == 0x0) {
            let weight = data[2] + (data[3] / 10);
            let severity = undefined;

            let maxWeight = weightInfo.maxIdealWeight;
            let minWeight = weightInfo.minIdealWeight;

            if (maxWeight && minWeight) {
                if (weight > maxWeight) {
                    severity = "overweight";
                } else if (weight < minWeight) {
                    severity = "underweight";
                } else {
                    severity = "normal";
                }
            }

            let date = new Date().toLocaleDateString();
            date = date.split('/');

            let day = parseInt(date[0]);
            let month = parseInt(date[1]);
            let year = parseInt(date[2]);

            if (!weightInfo.options.weightsData[year]) {
                weightInfo.options.weightsData[year] = {};
            }

            if (!weightInfo.options.weightsData[year][month]) {
                weightInfo.options.weightsData[year][month] = {};
            }

            if (!weightInfo.options.weightsData[year][month][day]) {
                weightInfo.options.weightsData[year][month][day] = {
                    time: `${data[0]}:${data[1]}`,
                    weight,
                    severity
                };
            }

            broadcast({
                type: 0x1,
                channel: "WeightMonitor",
                data: {
                    action: "newWeightData",
                    date,
                    time: `${data[0]}:${data[1]}`,
                    weight,
                    severity
                }
            })
        }
    }
}

const dvcChannels = {
    0x0: dvcFeedManager,
    0x1: dvcLightManager,
    0x2: dvcTempManager,
    0x3: dvcWeightManager
}

function syncDevice() {
    Object.keys(feedTimes).map(time => {
        client.addFeedTime(time, feedTimes[time].info.food, feedTimes[time].info.water, feedTimes[time].state);
    })

    client.toggleFeedOption(0x0, feedInfo.options.waterFlow);
    client.toggleFeedOption(0x1, feedInfo.options.auto);

    //Set light state
    client.sendBuffer(Buffer.from(
        [0x1, 0x3, 0x0, 0x3, lightInfo.getOption("light")]
    ))

    client.sendBuffer(Buffer.from(
        [0x1, 0x3, 0x0, 0x6, lightInfo.getOption("auto")]
    ))

    client.sendBuffer(Buffer.from(
        [0x1, 0x3, 0x0, 0x4, lightInfo.getOption("spectrum")]
    ))

    client.sendBuffer(Buffer.from(
        [0x1, 0x3, 0x0, 0x5, lightInfo.getOption("mobileAudio")]
    ))
}

// [---] Upgrade Handler [---]

const upgradeHandlers = {
    "PHDevice": function(req, sock, head, cookies) {
        //console.log(req.headers);

        sock.write('HTTP/1.1 101 Switching Protocols\r\n\r\n');

        client = new SockManager(sock, req, cookies);

        syncDevice();

        client.sendBuffer(
            Buffer.from(
                [0x1, 0x3, 0x2, 0x0, 0x1]
            )
        )

        client.on("data", function(data) {
            if (data.length < 10) console.log(data);

            try {
                if (data[0] == 0x1) {
                    dvcChannels[data[1]][data[2]](data);
                } else if (data[0] == 0x2) {
    
                }
            } catch (error) {
                console.log(error);
            }
        })
    },
    "WsClient": function(req, sock, head, cookies) {
        //console.log(req.headers);

        wss.handleUpgrade(req, sock, head, function(ws) {
            wss.emit('connection', ws, req);
            let wsClient = new WsManager(ws, req, cookies)

            let addr = Math.floor(Math.random()*0xffffff).toString(16).padStart(6, 0);
            while (wsClients[addr] != null) {
                addr = Math.floor(Math.random()*0xffffff).toString(16).padStart(6, 0);
            }

            wsClients[addr] = wsClient;

            Channels.registerWS(wsClient)

            wsClient.on("end", function() {
                console.log("Ws Client Ended")
                delete wsClients[addr];
            })
        })
    }
}

// [---] Cookie Parser [---]

function getCookies(raw) {
    if (raw == undefined) return {};
    var cookies = raw.split(';')
    var arr = {}

    cookies.forEach(cookie => {
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        let ck = cookie.substring(0, cookie.indexOf('='));
        let ck_val = cookie.substring(cookie.indexOf('=') + 1, cookie.length);
        
        arr[ck] = ck_val;
    });

    return arr;
}

// [---] Paths Managers [---]

const apiPaths = {
    'feed_info': (res, parsedUrl) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            feedTimes,
            feedOptions: feedInfo.options
        }));
    },
    'light_info': (res, parsedUrl) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            lightInfo: lightInfo.options
        }));
    },
    'temp_info': (res, parsedUrl) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            temperatureInfo: tempInfo.options
        }));
    },
    'main_info': (res, parsedUrl) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            mainInfo: {
                ...mainInfo.options,
                autoTempCtrl: tempInfo.options.autoTempCtrl,
                airFlow: tempInfo.options.airFlow
            }
        }));
    },
    'weight_info': (res, parsedUrl) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            weightInfo: weightInfo.options
        }));
    }
}

const pathsHandler = {
    'api': (req, res, parsedUrl) => {
        let { pathname, query } = parsedUrl;

        pathname = pathname.split('/');
        pathname.splice(0, 1);

        try {
            apiPaths[pathname[1]](res, parsedUrl)
        } catch (err) {
            console.log(err)
        }
    }
}

// [---] App Initialization [---]

app.prepare().then(() => {
    const httpserver = createServer((req, res) => {
        /*console.log("[*] New Request");
        console.log(req.method);
        console.log(req.url);
        console.log(req.headers);*/

        const parsedUrl = parse(req.url, true);
        let { pathname, query } = parsedUrl;

        pathname = pathname.split('/');
        pathname.splice(0, 1);

        try {
            pathsHandler[pathname[0]](req, res, parsedUrl)
        } catch (err) {
            handle(req, res, parsedUrl);
        }
    });

    httpserver.on('upgrade', (req, sock, head) => {
        if (req.headers['upgrade'] !== 'websocket') {
            sock.end('HTTP/1.1 400 Bad Request\r\n\r\n');
            return;
        }
    
        //console.log("[*] New UPGRADE request " + req.headers["sec-websocket-protocol"]);
        //console.log(req.headers)
    
        let cookies = getCookies(req.headers.cookie);
        //console.log(cookies);
    
        if (upgradeHandlers[req.headers["sec-websocket-protocol"]] == undefined) {
            sock.end('HTTP/1.1 400 Bad Request\r\n\r\n');
            return;
        }

        upgradeHandlers[req.headers["sec-websocket-protocol"]](req, sock, head, cookies);
    });

    httpserver.listen(1108, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:1108')
        //TimeManager.newInterval(sendTempRequest, 1000 * 60 * 15);
    });
})
