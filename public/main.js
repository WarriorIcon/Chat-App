const socket = io();
const chatMessages = document.querySelector('.chat-messages')

// get username and room from query string using Qs library parser
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// Join chatroom
// socket.emit('join room', formatMessage('USER', message)) //pick up here tomorrow

// Message from server
socket.on('message', message => {
    outputMessage(message)
    console.log(message)

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
});

//message submit
const chatForm = document.getElementById('chat-form')

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get client message text
    const msg = e.target.elements.msg.value;

    // emit message to the server
    socket.emit('chatMessage', msg);
    
    // clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

})

//output message to DOM

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}