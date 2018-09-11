const { log } = console;
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  log('New user connected');


  socket.on('createMessage', (msg) => {
    log('createMessage', msg);
    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    });
  })

  socket.on('disconnect', () => {
    log('User disconnected');
  });



});

server.listen(port, () => {
  log("Starting on port ", port);
})
