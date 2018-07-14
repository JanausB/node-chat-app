var socket = io();

function scrollToBottom(){
    //selectors
    var messages = $("#messages");
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    
    if(clientHeight + scrollTop + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}


socket.on('connect', function(){
   console.log("connected to server"); 
   
   
});

socket.on('disconnect', function(){
   console.log("Disconnected from server"); 
});

socket.on('newMsg', function(data){
    console.log('Message Received:', data);
    var formattedTime = moment(data.time).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: data.text,
        from: data.from,
        time: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newPosMsg', function(data){
    console.log('Message Received:', data);
    var formattedTime = moment(data.time).format('h:mm a');
    var template = $('#pos-template').html();
    var html = Mustache.render(template, {
        text: data.text,
        from: data.from,
        time: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

async function sendMessage(text, from){
    socket.emit('sendMsg', {
      text: text,
      from: from
   }, function(){
       console.log("OK");
       $('[name="message"]').val('')
   });
}

$("#message-form").on('submit', function(e){
    e.preventDefault();
    sendMessage($('[name="message"]').val(), "user") 
});

var locationButton = $("#sendLocation");
locationButton.on('click', function(){
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser.");
    }
    navigator.geolocation.getCurrentPosition(function(position){
        //success case
        console.log(position);
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('sendPosMsg', {
           lat: position.coords.latitude,
           lng: position.coords.longitude
       }, function(){
           
       });
   }, function(){
       //failure case
       alert('Unable to fetch location');
   });
});

