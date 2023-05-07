const HOST = location.origin.replace(/^http/, 'ws')
const myHeaders = new Headers();
const ws = new WebSocket(`${HOST}/ws`);
console.log(ws.url)
const Game = document.getElementById("Game");
const ResetBtn = document.getElementById("resetBtn");
const CreateGameBtn = document.getElementById("createGame")
const Loader = document.getElementById("loader")


let DataApi = [];

const myInit = { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 Cache: "no-cache" };


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


CreateGameBtn.addEventListener('click', () => {
    
    ws.send('getGameData');

    ws.addEventListener('message', function (event) {
        console.log(event)
        const data = JSON.parse(event.data);
        const srcImg = data.map((e) => e.name);
        let nameEltFinal = ""
        const name = data.map((e) => {
            let name_e = e.name.replace('.webp', "")
            // name_e = JSON.stringify(name_e)
            name_e.split('').forEach((elt)=>{
                console.log(elt)
                if(elt.includes('_')) {
                    return nameEltFinal
                    // alert(elt)
                }
                if(!elt.includes('-')){
                    nameEltFinal = elt
                }else{
                    nameEltFinal += ' '
                }
               
                return nameEltFinal   
                })
            return name_e
        });
        CreateGameBtn.remove();
        createGameBoard(Game, name, srcImg);
        console.log(srcImg);
    })
    
    ws.onclose = () => {
        console.log('WebSocket closed');
        ws.close()
    }
})

const createGameBoard = (parent, name, srcImg) => {
   console.log(name)
    const UL = document.createElement("UL");
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
        P.textContent =`${name[i]}`
        P.classList.add('name_people')
        selectPeople(IMG)
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