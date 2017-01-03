const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('../server/utils/message.js');

describe('generateMessage', function(){
    it('should generate correct message object', function(){
        var from = "User One";
        var text = "Hellloo there !!";
        
        var message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });
});


describe('generateLocationMessage', function(){
    it('should generate correct location object', function(){
        var from = "User One";
        var coords = {
            latitude: '123.66',
            longitude: '-456.22'
        };
        
        var message = generateLocationMessage(from, coords);

        expect(message.from).toBe(from);
        expect(message.url).toBe("https://google.com/maps?q=123.66,-456.22");
        expect(message.createdAt).toBeA('number');
    });
});