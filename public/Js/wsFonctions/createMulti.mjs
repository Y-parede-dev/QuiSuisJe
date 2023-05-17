const createInstance = (ws,wss) => {
    ws.send('createInstance');
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
}
export default createInstance;