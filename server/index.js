const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const WsManager = require('./components/WsManager.js');
const net = require("net")

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const upgradeHandlers = {
    "PHDevice": function(req, sock, head, cookies) {
        console.log(req.headers);

        sock.write('HTTP/1.1 101 Switching Protocols\r\n\r\n');

        let client = new WsManager(sock, req, cookies);
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

app.prepare().then(() => {
    const httpserver = createServer((req, res) => {
        console.log("[*] New Request");
        console.log(req.method);
        console.log(req.url);
        console.log(req.headers);

        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        handle(req, res, parsedUrl);
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
    
        upgradeHandlers[req.headers["sec-websocket-protocol"]](req, sock, head, cookies);
    });

    httpserver.listen(1107, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:1107')
    });
})
