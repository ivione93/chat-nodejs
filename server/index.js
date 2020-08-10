"use strict";

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/chat', function(req, res) {
    res.status(200).send('El chat funciona en http://192.168.1.132:6677');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de Socket.io y Node JS',
    nickname: 'Bot - socket.io'
}];

io.on('connection', function(socket) {
    console.log('El cliente con IP: ' + socket.handshake.address + " se ha conectado.");

    socket.emit('messages', messages);

    socket.on('add-message', function(data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, function() {
    console.log('Servidor arrancado en http://localhost:6677');
});