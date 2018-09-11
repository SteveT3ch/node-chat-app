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


  socket.emit('newMessage', {
    from: "bruce@example.com",
    text: "Hey what's up",
    createAt: 123
  });

  socket.on('createMessage', (msg) => {
    log(msg);
  })

  socket.on('disconnect', () => {
    log('User disconnected');
  });



});

server.listen(port, () => {
  log("Starting on port ", port);
})
