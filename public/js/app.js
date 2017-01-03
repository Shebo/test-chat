var socket = io();

socket.on('connect', function(){
    console.log('hello');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    var li = jQuery('<li></li>').text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'shell',
    text: 'new chat who dis?'
}, function(data){
    console.log('Got It!', data);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'shell',
        text: jQuery('input[name="message"]').val()
    }, function(data){
        console.log('Got It!', data);
    });
});