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

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>').text(`${message.from}: `);
    var a = jQuery('<a target="_blank">My Current Location</a>').attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        
    }, function(err){
        alert('Unable to fetch location.');
    });
});