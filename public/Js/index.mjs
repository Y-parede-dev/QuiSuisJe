import * as configJson from '../config.json' assert {type:'json'}
import createAndDestroyLoader from './Loader.mjs';
import createGameBoard from './gameFonctions/gameStart.mjs';

const HOST = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(`${HOST}/ws`);
console.log(ws.url)
const game = document.getElementById("Game");
const resetBtn = document.getElementById("resetBtn");
const createGameBtn = document.getElementById("createGame")
const config = configJson.default

if(!sessionStorage.getItem("reload")) {
    sessionStorage.setItem('reload', false)
}
window.onload = ()=>{
    const reloadLS = sessionStorage.getItem("reload")
    console.log(typeof(reloadLS))
    console.log(sessionStorage.getItem("reload"))
    if(reloadLS === 'false'){
        // if first load page in session execute loader 3 times
        //      It's only for style, if you want remplace conditional by: 
        createAndDestroyLoader(config.loader.timout.timming_timout)
    }
    else {
        // else execute loader 1 times
        createAndDestroyLoader(config.loader.timout.timming_timout_quick)
    }
}
// Reset la page
resetBtn.addEventListener('click', () => {
    document.location.reload()
    sessionStorage.setItem("reload", true)
})
// BTN create game, launch the game 
createGameBtn.addEventListener('click', (e) => {
    ws.send('getGameData');
    ws.addEventListener('message', async (event) => {
        const data = JSON.parse(event.data);
        const srcImg = data.map((e) => e.name);
        const name = data.map((e) => e.name.replaceAll('.webp', ""));
        createGameBtn.remove();
        createGameBoard(game, name, srcImg, config);
    })
    ws.onclose = () => {
        console.log('WebSocket closed');
        ws.close()
    }
})