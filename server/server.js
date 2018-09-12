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

const { generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  log('New user connected');

// socket.emit from Admin text Welcom to the chat app
  let message = generateMessage('Admin', 'Welcome to the chat app');
  socket.emit('newMessage', message);

  // socket.broadcast.emit from Admin text New user joined
  message = generateMessage('Admin', 'New user joined');
  socket.broadcast.emit('newMessage',message);

  socket.on('createMessage', (msg, callback) => {
    log('createMessage', msg);

    message = generateMessage(msg.from, msg.text);
    io.emit('newMessage',message);
    callback('data from server');

    //socket.broadcast.emit('newMessage',message);
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    log('User disconnected');
  });



});

server.listen(port, () => {
  log("Starting on port ", port);
})
