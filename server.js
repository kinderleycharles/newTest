'use strict';

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);


const PORT = process.env.PORT || 5000;
http.listen(PORT, function(){
  console.log(`listening on: ${ PORT }`);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/roslib.min.js', function(req, res){
  res.sendFile(__dirname + '/roslib.min.js');
});

app.get('/eventemitter2.min.js', function(req, res){
  res.sendFile(__dirname + '/eventemitter2.min.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('device status', function(msg){
    console.log(msg.name + msg.status);
    io.emit('device status', msg);
  });
});
