const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:3000');
ws.on('open', () => {
    console.log('WebSocket connection opened');
    ws.send('ping');
});
ws.on('message', (msg) => {
    console.log('Received:', msg);
    ws.close();
});
ws.on('error', (err) => {
    console.error('Error:', err.message);
});
ws.on('close', () => {
    console.log('WebSocket closed');
});
