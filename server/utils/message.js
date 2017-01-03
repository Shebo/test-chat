var moment = require('moment');

var generateMessage = function(from, text){
    return {
        from: from,
        text: text,
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = function(from, coords){
    return {
        from: from,
        url: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {
    generateMessage: generateMessage,
    generateLocationMessage: generateLocationMessage
};