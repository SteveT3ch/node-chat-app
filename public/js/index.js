let socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('newMessage', function (msg) {
  console.log(msg);
});

socket.on('disconnect', function () {
  console.log('Disconnect from server');
});
