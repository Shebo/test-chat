const expect = require('expect');

const {isRealString} = require('../server/utils/validation.js');

describe('isRealString', function(){
    it('should reject non-string values', function(){
        expect(isRealString(5)).toBe(false);
        expect(isRealString(true)).toBe(false);
        expect(isRealString([])).toBe(false);
        expect(isRealString({})).toBe(false);
        expect(isRealString(function(){})).toBe(false);
    });
    
    
    it('should reject empty string', function(){
        var str = "    ";
        
        var validatedString = isRealString(str);
        expect(validatedString).toBe(false);
    });

    it('should allow full string', function(){
        var str = "   sad dsad ";
        
        var validatedString = isRealString(str);
        expect(validatedString).toBe(true);
    });
});