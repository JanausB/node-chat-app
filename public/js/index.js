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
   });
}

$("#message-form").on('submit', function(e){
    e.preventDefault();
    sendMessage($('[name="message"]').val(), "user") 
});