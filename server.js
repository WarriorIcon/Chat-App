const express = require('express');
const path = require('path')

const http = require('http');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server);
const formatMessage = require('./utils/messages.js')
const {userJoin, getCurrentUser, userLeavesChat, getRoomusers, getRoomUsers} = require('./utils/user.js')

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Chat Bot'

//when a client connects to the server we...
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room)

         //welcome the new user client-side
        socket.emit('message', formatMessage(botName, "Welcome to HappyChat"));

        //broadcast to all users in the room about when new clients connect. 
        socket.broadcast.to(user.room).emit(
        'message', 
        formatMessage(botName, `${user.username} has joined the chat!`)
        )

				// send user and room infos
				io.to(user.room).emit('roomUsers', {
					room: user.room,
					users: getRoomUsers(user.room)
				})
    });
   
		// Listen for chatMessage
		socket.on('chatMessage', (msg) => {
				const user = getCurrentUser(socket.id)
				
				io.to(user.room).emit('message', formatMessage(user.username, msg));
		})

    // run when a client disconnects from server
    socket.on('disconnect', () => {
				const user = userLeavesChat(socket.id)
				if (user) {
					io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat!`));

					// send user and room infos
					io.to(user.room).emit('roomUsers', {
						room: user.room,
						users: getRoomUsers(user.room)
					});
			};					
		});
});




const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`))