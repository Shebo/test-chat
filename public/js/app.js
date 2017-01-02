var socket = io();

socket.on('connect', function(){
    console.log('hello');
    
    socket.emit('createMessage', {
        from: 'shell',
        text: 'new chat who dis?'
    });
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New msg', message);
});