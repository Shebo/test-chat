var socket = io();

socket.on('connect', function(){
    console.log('hello');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('H:mm');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('H:mm');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
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