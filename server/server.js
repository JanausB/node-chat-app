const path                  = require("path");                                          
const publicPath            = path.join(__dirname, "../public");
const express               = require("express");
var app                     = express();
const port                  = process.env.PORT;

app.use(express.static(publicPath));

app.get('/', function(req, res){
   res.render('index.html'); 
});








app.listen(process.env.PORT, process.env.IP, function(){
    console.log("node-chat-app listner Service spinning, up. We're in the pipe, 5 by 5!");
});