"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ws_1 = require("ws");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//create a new websocket connection
wss.on("connection", (ws) => {
    console.log("New Client Connected");
    ws.on("message", (data) => {
        console.log("Received a message from the client: " + data);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState == ws_1.WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
