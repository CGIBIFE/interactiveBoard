const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/quizda/index.html');
})
app.use(express.static(__dirname + '/dist/quizda/'));

io.on('connection',(socket) => {
    console.log('User Joined')
    socket.on('create', (room) => {
        console.log(`created Room: ${room}`)
        socket.join(room)
    });

    socket.on('join',(details) => {
        console.log(`user joined in Room: ${details.channel}`);
        socket.join(details.channel)
        socket.emit('userJoined',details.name)
    })

})

http.listen(3000, function () {
    console.log('Localhost:3000')
})
