const http = require('http');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const INTERVAL = process.env.INTERVAL || 1000;
const TIMEOUT = process.env.TIMEOUT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    let now = () => {
      return new Date().toUTCString();
    };
    console.log('Request time: ', now());

    let nowTime = setInterval(() => {
      console.log('Tick: ', now());
      res.write(`<p>${now()}</p>`);
    }, INTERVAL);

    setTimeout(() => {
      clearInterval(nowTime);
      res.end(`Timer stop: ${now()}`);
    }, TIMEOUT);
  }
});

server.listen(PORT, err => {
  if (err) {
    return console.log('Server error :', err);
  }
  console.log(`Server has been started..`);
});
