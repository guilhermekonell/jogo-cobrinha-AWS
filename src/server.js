const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = 8080;
const HOST = '0.0.0.0';

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.use('/', (req, res) => {
  res.render('index.html');
});

http.listen(PORT, HOST, () => {
  console.log(`Rodando em http://${HOST}:${PORT}`);
});