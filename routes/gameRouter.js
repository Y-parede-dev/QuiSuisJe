// const router = require('express').Router({mergeParams: true})
// router.ws('/', (ws, req) => {
//     console.log('Client connected');
  
//     ws.on('message', (message) => {
//       console.log('Received message:', message);
//       if (message === 'getGameData') {
//           ws.send(JSON.stringify(allNamesImg));
//         wss.clients.forEach(client => {
//           console.log(client)
//             client.send(JSON.stringify(tt));
//         });
//       }
//     });
  
//     ws.on('close', () => console.log('Client disconnected'));
//   });
//   module.exports = router 