var socket = io();

socket.on('connect', function(){
   console.log("connected to server"); 
   
   
});

socket.on('disconnect', function(){
   console.log("Disconnected from server"); 
});

socket.on('newMsg', function(data){
    console.log('Message Received:', data);
    var li = `<li>${data.from} : ${data.text}</li>`;
    $("#messages").append(li);
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

socket.on('newPosMsg', function(data){
    console.log('Message Received:', data);
    var li = `<li>${data.from} : <a target='_blank' href='${data.url}'>My Location</a></li>`;
    $("#messages").append(li);
});