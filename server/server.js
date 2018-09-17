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
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  log('New user connected');

  socket.on('join', (params, callback) => {
      if (!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and room name are required.')
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      // socket.leave('room name');

      // io.emit -> io.to('room name').emit message everyone
      // socket.broadcast.emit -> socket.broadcast.to('room').emit
      // socket.emit  send message to specific users

      // socket.emit from Admin text Welcom to the chat app
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

      // socket.broadcast.emit from Admin text New user joined
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined`));

      callback();
  });

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

    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
    log('User disconnected');
  });



});

server.listen(port, () => {
  log("Starting on port ", port);
})
