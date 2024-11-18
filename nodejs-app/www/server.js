import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("hello", (msg) => console.log(msg))
});


server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});