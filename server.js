const express = require("express")
const fs = require('fs')
const http = require('http')
const cors = require("cors")
const morgan = require('morgan')
const bodyParser = require("body-parser")
const router = express.Router()
const App = express()
const port = 3000 | process.env.PORT

const publicDir = fs.readdirSync(__dirname + "/public/Assets/images")
let tt = []
const errorHandler = error => {  // gestion des erreurs
    if (error.syscall !== 'listen') {
      throw error;
    };
    const address = Server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    };
  };
publicDir.forEach(file=>{
    tt.push({name:file})
    let t = __filename
    // fs.readFileSync(file.__filename)
    // console.log(file)
})
router.get('/', (req,res)=>{
    // res.type('html')
    
    res.sendFile(__dirname + '/public/index.html')
})
router.get('/public/Assets/images', (req,res)=>{
    // res.type('application/json')
    // res.send(()=>{
    //     publicDir.forEach(file=>{
    //         return file
    //         console.log(file)
    //     })
    // })
    res.status(200)
    res.send(tt)
})
// router
//     .get("/",(req, res) => {
//         res.render('home', fs.readdirSync('./index.html',))
//     })

App.use(morgan('combined')); 
App.use(cors()); 
App.use(bodyParser.json()); 
App.use(bodyParser.urlencoded({
    extended: true
}));
App.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
App.use(router)
App.use(express.static(__dirname + '/public'));
App.use(express.static(__dirname + '/public/Assets/images'));

// App.listen(port,()=>{
//     console.log('Server app listening on port ' + port)
// })
const Server = http.createServer(App)
Server.on('error', errorHandler);  // si le serveur a une erreur sa nous la renvoie

Server.on('listening', () => { //si tout est ok, ecoute l'adresse et on y ajoute le port
  const address = Server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  
  console.log('Listening on ' + bind); // on renvoie ecoute sur et le port a la console pour dire que tout c'est bien passer
});

// on applique la fonction listen au Server avec le port en argument
Server.listen(port);