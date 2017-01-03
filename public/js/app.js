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

    var messageInput = jQuery('input[name="message"]');

    socket.emit('createMessage', {
        from: 'shell',
        text: messageInput.val()
    }, function(data){
        messageInput.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e){
    
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }

    var originalText = locationButton.text();
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text(originalText);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(err){
        locationButton.removeAttr('disabled').text(originalText);
        alert('Unable to fetch location.');
    });
});