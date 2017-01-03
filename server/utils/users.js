var _ = require('lodash');

class Users extends Array {
    constructor() {
        super();
    }

    getUser(id){
        return _.find(this, { 'id': id });
    }

    addUser(id, name, room){
        var user = {
            id: id,
            name: name,
            room: room 
        };
        this.push(user);
        return user;
    }

    removeUser(id){
        return _.remove(this, { 'id': id })[0];
    }

    getUsersByRoom(room){
        return _.chain(this)
                .filter({ 'room': room })
                .map('name')
                .value();
    }
}

module.exports = {
    Users: Users
};