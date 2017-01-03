const path = require("path");
const http = require("http");
const _ = require("lodash");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', function(socket){
    console.log('New user is connected');
    
    socket.on('join', function(params, callback){
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.');
        }

        // add user to requested room
        socket.join(params.room);

        // remove user from all rooms in managed list
        users.removeUser(socket.id);
        
        // add user to requested room in managed list
        users.addUser(socket.id, params.name, params.room);

        // send updated userList to all the room's users
        io.to(params.room).emit('updateUserList', users.getUsersByRoom(params.room));

        // welcome user on connection
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        // notify other users in the room that a new user has joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined to '${params.room}'.`));
        callback();
    });

    socket.on('createMessage', function(message, callback){
        console.log('Create Message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        if(callback) callback();
    });

    socket.on('createLocationMessage', function(coords){
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords));
    });

    socket.on('disconnect', function(){
        // remove user from all rooms in managed list
        var removedUser = users.removeUser(socket.id);

        if(removedUser){
            io.to(removedUser.room).emit('updateUserList', users.getUsersByRoom(removedUser.room));
            io.to(removedUser.room).emit('newMessage', generateMessage('Admin', `${removedUser.name} has left.`));
        }
    });
});

// app.get('/', function(req, res){
//     res.render('index');
// });

server.listen(port, function(){
    console.log(`Started Server on port ${port}`);
});