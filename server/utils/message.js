var generateMessage = function(from, text){
    return {
        from: from,
        text: text,
        createdAt: new Date().getTime()
    };
};

var generateLocationMessage = function(from, coords){
    return {
        from: from,
        url: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {
    generateMessage: generateMessage,
    generateLocationMessage: generateLocationMessage
};