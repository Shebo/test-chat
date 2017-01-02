const path = require("path");
const http = require("http");
const _ = require("lodash");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', function(socket){
    console.log('server is connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('disconnect', function(){
        console.log('Client Bye Bye');
    });
    
    socket.on('createMessage', function(message){
        console.log('Create Message', message);
        io.emit('newMessage', _.assign({ 
            'createdAt': new Date().getTime()
        }, _.pick(message, ['from', 'text'])));
    });
});

// app.get('/', function(req, res){
//     res.render('index');
// });

server.listen(port, function(){
    console.log(`Started Server on port ${port}`);
});