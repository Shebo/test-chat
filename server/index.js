const path = require("path");
const http = require("http");
const _ = require("lodash");
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require('./utils/message.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', function(socket){
    console.log('server is connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('disconnect', function(){
        console.log('Client Bye Bye');
    });
    
    socket.on('createMessage', function(message, callback){
        console.log('Create Message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        if(callback) callback('this is the serverrr');
    });
});

// app.get('/', function(req, res){
//     res.render('index');
// });

server.listen(port, function(){
    console.log(`Started Server on port ${port}`);
});