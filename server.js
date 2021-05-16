const express = require('express');
const path = require('path')

const http = require('http');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));

//when a client connects to the server we...
io.on('connection', socket => {
    
    //welcome the new user client-side
    socket.emit('message', "Welcome to Chatcord");

    //broadcast to all users in the room about when new clients connect. 
    socket.broadcast.emit('message', 'A user has joined the chat!')

    // run when a client disconnects from server
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat!');
    })

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg)
    })
})




const PORT = 3000 || process.env.port;

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`))