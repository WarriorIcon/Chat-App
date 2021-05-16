const moment = require('moment');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a') // moment.js library: hours minutes and am or pm
    }
}

module.exports = formatMessage;