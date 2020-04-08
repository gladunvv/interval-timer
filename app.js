const http = require('http');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const INTERVAL = process.env.INTERVAL || 1;
const TIMEOUT = process.env.TIMEOUT || 5;

let requests = [];
let counter = 0;
let interval;

let nowTime = () => {
  return new Date().toUTCString();
};

function logRequests(resolve) {
  requests.push(resolve);
  if (interval) return;
  interval = setInterval(() => {
    if (!requests.length) return (interval = clearInterval(interval));
    console.log(`Tick: ${nowTime()}`);
    counter = ++counter % TIMEOUT;
    if (!counter) requests.shift()(`\nTimer stop at ${nowTime()}`);
  }, INTERVAL * 1000);
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json', 'utf-8');
    res.write(`Timer start at ${nowTime()}`);
    res.write(await new Promise(logRequests));
  }
});

server.listen(PORT, err => {
  if (err) {
    return console.log('Server error :', err);
  }
  console.log(`Server has been started..`);
});
