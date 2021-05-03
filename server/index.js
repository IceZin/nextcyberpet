const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const WebSocket = require('ws');
const WsManager = require('./components/WsManager.js');
const SockManager = require('./components/SockManager.js');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const wss = new WebSocket.Server({ noServer: true });

var client;
var wsClients = {};

var feedTimes = {}

function broadcast(data) {
    Object.values(wsClients).forEach(client => {
        client.sendJSON(data);
    })
}

const clientDataHandler = {
    "toggleFeedTime": (data) => {
        if (feedTimes[data.boxTime] != null) {
            feedTimes[data.boxTime].state = !feedTimes[data.boxTime].state;

            broadcast({
                type: 0x1,
                data: {
                    action: "toggleFeedTime",
                    box: {
                        time: data.boxTime,
                        state: feedTimes[data.boxTime].state
                    }
                }
            })
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
            data: {
                action: "newFeedTime",
                box: {
                    time: data.params.time,
                    ...feedTimes[data.params.time]
                }
            }
        })

        if (client != null) {
            client.sendBuffer(Buffer.from([0x1, 0x3, 0x1, 0x1, 0x0]));
        }
    },
    "deleteFeedTime": (data) => {
        if (feedTimes[data.boxTime] != null) {
            delete feedTimes[data.boxTime];

            broadcast({
                type: 0x1,
                data: {
                    action: "deleteFeedTime",
                    boxTime: data.boxTime
                }
            })
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
        }
    }
}

const upgradeHandlers = {
    "PHDevice": function(req, sock, head, cookies) {
        console.log(req.headers);

        sock.write('HTTP/1.1 101 Switching Protocols\r\n\r\n');

        client = new SockManager(sock, req, cookies);

        client.on("data", function(data) {

        })
    },
    "WsClient": function(req, sock, head, cookies) {
        console.log(req.headers);

        wss.handleUpgrade(req, sock, head, function(ws) {
            wss.emit('connection', ws, req);
            let wsClient = new WsManager(ws, req, cookies)

            let addr = Math.floor(Math.random()*0xffffff).toString(16).padStart(6, 0);
            while (wsClients[addr] != null) {
                addr = Math.floor(Math.random()*0xffffff).toString(16).padStart(6, 0);
            }

            wsClients[addr] = wsClient;
            
            wsClient.on("data", function(packet) {
                console.log(packet.data);

                try {
                    clientDataHandler[packet.data.action](packet.data);
                } catch (err) {
                    console.log(err);
                }
            })

            wsClient.on("end", function() {
                console.log("Ws Client Ended")
                delete wsClients[addr];
            })
        })
    }
}

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

const pathsHandler = {
    'api': (req, res, parsedUrl) => {
        let { pathname, query } = parsedUrl;

        pathname = pathname.split('/').splice(0, 1);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(feedTimes));
    }
}

app.prepare().then(() => {
    const httpserver = createServer((req, res) => {
        console.log("[*] New Request");
        console.log(req.method);
        console.log(req.url);
        console.log(req.headers);

        const parsedUrl = parse(req.url, true);
        let { pathname, query } = parsedUrl;

        pathname = pathname.split('/');
        pathname.splice(0, 1);

        console.log(pathname)

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
    
        console.log("[*] New UPGRADE request " + req.headers["sec-websocket-protocol"]);
    
        console.log(req.headers)
    
        let cookies = getCookies(req.headers.cookie);
        console.log(cookies);
    
        if (upgradeHandlers[req.headers["sec-websocket-protocol"]] == undefined) {
            sock.end('HTTP/1.1 400 Bad Request\r\n\r\n');
            return;
        }

        upgradeHandlers[req.headers["sec-websocket-protocol"]](req, sock, head, cookies);
    });

    httpserver.listen(1108, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:1108')
    });
})
