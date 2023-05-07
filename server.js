const express = require("express");
const fs = require('fs');
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const server = express();
const expressWs = require('express-ws')
const WebSocket = require('ws');
const publicDir = fs.readdirSync(__dirname + "/public/Assets/images");
let tt = [];
const pingServer = (url) => {
    fetch(url)
    .then(res => console.log('Ping réussi !'))
    .catch(err => console.error('Erreur lors du ping:', err));
  setTimeout(pingServer, 59545);
  }
expressWs(server);

publicDir.forEach(file=>{
    tt.push({name:file});
});

router.get('/', (req,res)=>{
    
    res.sendFile(__dirname + '/public/index.html');
});


server.use(cors()); 
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({ extended: true }));
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
server.use(router);
server.use(express.static(__dirname + '/public'));
server.use(express.static(__dirname + '/public/Assets/images'));

const wss = new WebSocket.Server({ server });
const wsRouter = express.Router();

wsRouter.ws('/ws', (ws, req) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);
    if (message === 'getGameData') {
        ws.send(JSON.stringify(tt));
      wss.clients.forEach(client => {
        console.log(client)
          client.send(JSON.stringify(tt));
      });
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

wsRouter.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.use(wsRouter);

const port = process.env.PORT || 437;
pingServer("https://blooming-bastion-76768.herokuapp.com/")
server.listen(port, ()=> {console.log('Serveur ouvert sur le port ' + port)});