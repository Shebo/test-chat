const expect = require('expect');

var {Users} = require('../server/utils/users.js');

describe('Users', function(){
    var users;

    beforeEach(function(){
        users = new Users();
        users.push({
            id: 1,
            name: 'Mike',
            room: 'RoomOne'
        }, {
            id: 2,
            name: 'Jen',
            room: 'RoomTwo'
        }, {
            id: 3,
            name: 'Jerry',
            room: 'RoomOne'
        });
    });

    it('should add new user', function(){
        var user = {
            id: 123,
            name: 'Sheb',
            room: 'RoomOne'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(resUser).toMatch(user);
        expect(users).toBeA('array');
        expect(users).toInclude(user);
    });

    it('should return users names for RoomOne', function(){
        var userList = users.getUsersByRoom('RoomOne');

        expect(userList).toBeA('array');
        expect(userList.length).toBe(2);
        expect(userList).toEqual(['Mike', 'Jerry']);
    });

    it('should return users names for RoomTwo', function(){
        var userList = users.getUsersByRoom('RoomTwo');

        expect(userList).toBeA('array');
        expect(userList.length).toBe(1);
        expect(userList).toEqual(['Jen']);
    });

    it('should remove a user', function(){
        var deletedUser = users.removeUser(1);

        expect(deletedUser).toInclude({id: 1, name: 'Mike'});
        expect(users.length).toBe(2);
    });

    it('should not remove a user', function(){
        var deletedUser = users.removeUser(1123);

        expect(deletedUser).toNotExist();
        expect(users.length).toBe(3);
    });

    it('should find user', function(){
        var user = users.getUser(1);

        expect(user).toBeA('object');
        expect(user).toInclude({id: 1, name: 'Mike'});
        
    });

    it('should not find user', function(){
        var user = users.getUser(657657);

        expect(user).toNotExist();
    });
});