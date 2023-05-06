const express = require("express")
const fs = require('fs')
const http = require('http')
const cors = require("cors")
const morgan = require('morgan')
const bodyParser = require("body-parser")
const router = express.Router()
const Server = http.createServer((req,res)=>{

})
const App = express()
const port = 3000 | process.env.PORT

const publicDir = fs.readdirSync(__dirname + "/public/Assets/images")
let tt = []
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

App.listen(port,()=>{
    console.log('Server app listening on port ' + port)
})