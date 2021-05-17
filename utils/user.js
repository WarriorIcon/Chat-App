const users = [];

// Add user to chatroom

function userJoin(id, username, room) {
    const user = {id, username, room};

    users.push(user);

    return user;
}

//get current user

function getCurrentUser(id) {
    return users.find( user => user.id === id);
}

//user leaves chat

function userLeavesChat(id) {
    const index = users.findIndex(user => user.id === id)
    if (index != -1) {
        return users.splice(index, 1)[0]; // I don't really understand why [0] works here. Need to research
    }
}

// Get room users

function getRoomUsers(room) {
    return users.filter( user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeavesChat,
    getRoomUsers
}