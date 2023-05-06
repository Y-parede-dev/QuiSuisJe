const Game = document.getElementById("Game");
const ResetBtn = document.getElementById("resetBtn");
const CreateGameBtn = document.getElementById("createGame")
const Loader = document.getElementById("loader")
// let storageRef = firebase.storage.ref("images");
// import * as images from "/public/Assets/images"
// console.log(images)
// import images from '../Assets/images'

// console.log(images)
// for (let image in images){
//     console.log(`<img src=${image}/>`)
// }

// const dirImages = fs.readdirSync(__dirname)
// dirImages.forEach(image=>{
//     console.log(image)
// })
// console.log(storageRef)
// fetch("gs://quisuisje-95869.appspot.com")
//     .then(res=>res.json())
//     .then(res=> console.log(res))
let DataApi = [];
const myHeaders = new Headers();

const myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 Cache: "no-cache" };

// data = data[0]
// data.forEach(e=>{ console.log(e)})
console.log(DataApi.length)
DataApi.map(e=>console.log(e))
const loading = document.createElement('P');
const loadElt = ["l","o","a","d","i","n","g"]

if(!sessionStorage.getItem("reload")) {
    sessionStorage.setItem('reload', false)
}
Loader.classList.add('Loader_container')
loadElt.forEach((elt)=>{
    const loadEltSpan = document.createElement("SPAN")
    loadEltSpan.textContent = elt
    loadEltSpan.classList.add('loadElt')
    loading.appendChild(loadEltSpan)
})
Loader.appendChild(loading)
// pour reset le Session Storage pour les tests
window.onload = ()=>{
    const reloadLS = sessionStorage.getItem("reload")
    console.log(typeof(reloadLS))
    console.log(sessionStorage.getItem("reload"))
    if(reloadLS === 'false'){
        createTimeout(4160)
    }
    else {
        createTimeout(1386)
    }
}
const createTimeout = (duree) => {
    const timeout = setTimeout(()=>{
        Loader.remove()
    }, duree)
    return (()=>{
        clearTimeout(timeout)
        }
    )
}
// Reset la page
ResetBtn.addEventListener('click', () => {
    document.location.reload()
    sessionStorage.setItem("reload", true)
})
const url = "/public/Assets/images"
// Creation du jeux au clique sur le Bouton
CreateGameBtn.addEventListener('click', () => {
    CreateGameBtn.remove()
    fetch(url, myInit)
    .then((res) => res.json())
    .then((res) => {
        res.map(e=>{
            // console.log(e.name)
            DataApi.push(e.name)
        })
        createGameBoard(Game, url, DataApi)
        console.log(DataApi)
    })
    .catch((err) => console.error(err))
})

const createGameBoard = (parent, urlBase, srcImg) => {
    const UL = document.createElement("UL");
    // console.log(srcImg)
    for(let i=0;i<24;i++){
        const LI = document.createElement("LI");
        const DIV = document.createElement("DIV");
        const IMG = document.createElement("IMG");
        const P = document.createElement("P");
        IMG.classList.add("people_img")
        DIV.classList.add("people_container")
        IMG.src = srcImg[i]
        LI.classList.add('people')
        LI.classList.add(`people_${i}`)
        P.textContent =`people__${i}`
        selectPeople(DIV)
        DIV.appendChild(IMG)
        DIV.appendChild(P)
        LI.appendChild(DIV)
        UL.appendChild(LI)
    }
    UL.classList.add("list_peoples")
    parent.appendChild(UL)
}
const selectPeople = (elt) => {
    elt.addEventListener('click', () => {
        if(elt.classList.contains('people_down')){
            elt.classList.remove('people_down')

        }else{
            elt.classList.add('people_down')
        }
    })
}