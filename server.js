'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('device status', function(msg){
    // console.log(msg.name + msg.status);
    io.emit('device status', msg);
  });
});

http.listen(PORT, function(){
  console.log(`listening on: ${ PORT }`);
});
