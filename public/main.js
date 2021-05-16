const socket = io();

// Message from server
socket.on('message', message => {
    outputMessage(message)
    console.log(message)
})

//message submit
const chatForm = document.getElementById('chat-form')

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get client message text
    const msg = e.target.elements.msg.value;

    // emit message to the server
    socket.emit('chatMessage', msg);
})

//output message to DOM

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}