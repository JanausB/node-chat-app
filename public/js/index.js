var socket = io();

socket.on('connect', function(){
   console.log("connected to server"); 
//   sendMessage("User has joined the chat", "jay")
   
});

socket.on('disconnect', function(){
   console.log("Disconnected from server"); 
});

socket.on('newMsg', function(data){
    console.log('Message Received:', data);
});

function sendMessage(text, from){
    socket.emit('sendMsg', {
      text: text,
      from: from
   });
}