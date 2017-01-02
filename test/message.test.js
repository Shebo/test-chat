  const expect = require('expect');

  var {generateMessage} = require('../server/utils/message.js');

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