const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

const getFile = (url, res, contentType) => {
  const filePath = `.${url}`;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      return res.end('404 Not Found');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/public/text.txt') {
    getFile(url, res, 'text/plain');
  } else if (url === '/public/index.html') {
    getFile(url, res, 'text/html');
  } else if (url === '/public/img.jpg') {
    getFile(url, res, 'image/jpeg');
  } else if (url === '/public/video.mp4') {
    getFile(url, res, 'video/mp4');
  } else if (url === '/public/audio.mp3') {
    getFile(url, res, 'audio/mpeg');
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write("TEXT: '/public/text.txt'\n\n");
    res.write("HTML: '/public/index.html'\n\n");
    res.write("IMAGE: '/public/img.jpg'\n\n");
    res.write("VIDEO: '/public/video.mp4'\n\n");
    res.write("AUDIO: '/public/audio.mp3'");
    res.end();
  }
});

server.listen(PORT);
