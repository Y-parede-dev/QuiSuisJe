const express = require("express")
const fs = require('fs')
// const http = require('http')
const cors = require("cors")
// const morgan = require('morgan')
const bodyParser = require("body-parser")
const router = express.Router()
const server = express()
const port = 8080 || process.env.PORT
const { Server } = require('ws');
const publicDir = fs.readdirSync(__dirname + "/public/Assets/images")
let tt = []

publicDir.forEach(file=>{
    tt.push({name:file})
    let t = __filename
    
})
router.get('/', (req,res)=>{
    
    
    res.sendFile(__dirname + '/public/index.html')
})
router.get('/public/Assets/images', (req,res)=>{
    setInterval(() => {
        wss.clients.forEach((client) => {
          client.send(tt);
        });
      }, 1000);
    // res.status(200)
    // res.send(tt)
})


// server.use(morgan('combined')); 
server.use(cors()); 
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
server.use(router)
server.use(express.static(__dirname + '/public'));
server.use(express.static(__dirname + '/public/Assets/images'));


server.listen(port, ()=> {console.log('server onpen sur le port ' + port)});
const wss = new Server({ server });
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
  });
  setInterval(() => {
    wss.clients.forEach((client) => {
      client.send(new Date().toTimeString());
    });
  }, 1000);