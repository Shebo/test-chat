var socket = io();

function scrollToBottom(){
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function(){
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if(err) {
            alert(err);
            window.location.href = '/';
        }else{
            console.log('no errrosss');
        }
    });
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
    var ul = jQuery('<ul></ul>');
    users.forEach(function(user){
        ul.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').append(ul);
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
    scrollToBottom();
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
    scrollToBottom();
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