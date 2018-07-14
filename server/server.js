const path                  = require("path");                                          
const publicPath            = path.join(__dirname, "../public");
const express               = require("express");
const port                  = process.env.PORT;
const socketIO              = require("socket.io");
const http                  = require("http");
const {genMsg, 
      genPosMsg}            = require("./utils/message");
const {isRealString}        = require("./utils/validation");
const {Users}               = require("./utils/users");

var app                     = express();
var server                  = http.createServer(app);
var io                      = socketIO(server);
var users                   = new Users();

app.use(express.static(publicPath));

io.on('connection', function(socket){
    console.log("New user connected");
    
    
    
    socket.on('join', function(params, callback) {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name and Room are required.");
        }else{
            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            
            socket.emit('newMsg', genMsg(`Welcome to the chat, ${params.name}`,'System'));
            socket.broadcast.to(params.room).emit('newMsg', genMsg(`${params.name} has joined the chat`, "System"));
            callback();
        }
    });
    
    socket.on('sendMsg', function(data, callback) {
        console.log('sendMsg:', data);
        io.emit('newMsg', genMsg(data.text, data.from));
        callback();
    });
    
    socket.on('sendPosMsg', function(data, callback) {
        console.log('sendMsg:', data);
        io.emit('newPosMsg', genPosMsg(data.lat, data.lng, "System"));
        callback();
    });
    
    socket.on('disconnect', function(){
        console.log("Client disconnected");
        var user = users.removeUser(socket.id)
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMsg', genMsg(`${user.name} has left the chat`, "System"));
        }
    });
    
    
});




app.get('/', function(req, res){
   res.render('index.html'); 
});








server.listen(process.env.PORT, process.env.IP, function(){
    console.log("node-chat-app listner Service spinning, up. We're in the pipe, 5 by 5!");
});