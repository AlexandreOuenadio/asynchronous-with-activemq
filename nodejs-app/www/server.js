import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import MessageRouter from "./routers/MessageRouter.js"

const app = express();
const server = createServer(app);

// ------------ WEBSOCKETS ------------ 
const io = new Server(server);
app.set("io", io);

// ------------ REST API ------------ 

app.use(express.static("public"))
app.use(express.json())
app.use(morgan("tiny"))
app.use(MessageRouter)

const PORT = 8080
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
