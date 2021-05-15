const express = require('express');
const path = require('path')
const http = require('http');
const socketio = require('socket.io')


const app = express();
const server = http.createServer(app)
const io = socketio(server);
app.use(express.static(path.join(__dirname, 'public')));

//do this  when a client connects
io.on('connection', socket => {
    console.log('New websocket connection')
})

const PORT = 3000 || process.env.port;

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`))