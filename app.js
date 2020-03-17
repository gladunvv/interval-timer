const http = require('http');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const INTERVAL = process.env.INTERVAL || 1000;
const TIMEOUT = process.env.TIMEOUT || 5000;

console.log('PORT :', PORT);
console.log('INTERVAL :', INTERVAL);
console.log('TIMEOUT :', TIMEOUT);

const server = http.createServer((req, res) => {
  res.writeHeader(200, { 'Content-Type': 'text/html' });
  let nowTime = setInterval(() => {
    let now = new Date().toUTCString();
    console.log('Now :', now);
    res.write(`<p>${now}</p>`)
  }, INTERVAL);

  setTimeout(() => {
    clearInterval(nowTime);
    res.end()
  }, TIMEOUT);
});

server.listen(PORT, err => {
  if (err) {
    return console.log('Server error :', err);
  }
  console.log(`Server has been started..`);
});
