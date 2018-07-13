const path                  = require("path");                                          
const publicPath            = path.join(__dirname, "../public");
const express               = require("express");
const port                  = process.env.PORT;
const socketIO              = require("socket.io");
const http                  = require("http");
const {genMsg}               = require("./utils/message");

var app                     = express();
var server                  = http.createServer(app);
var io                      = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log("New user connected");
    
    socket.emit('newMsg', genMsg('Welcome to the chat','System'));
    
    socket.broadcast.emit('newMsg', genMsg("A user has joined the chat", "System"));
    
    socket.on('sendMsg', function(data, callback) {
        console.log('sendMsg:', data);
        io.emit('newMsg', genMsg(data.text, data.from));
        callback();
    });
    
    socket.on('disconnect', function(socket){
        console.log("Client disconnected");
    });
});




app.get('/', function(req, res){
   res.render('index.html'); 
});








server.listen(process.env.PORT, process.env.IP, function(){
    console.log("node-chat-app listner Service spinning, up. We're in the pipe, 5 by 5!");
});