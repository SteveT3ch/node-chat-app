let socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.emit('createMessage', {
  from: "loki@example.com",
  text: "Thanos will kill you"
});

socket.on('newMessage', function (msg) {
  console.log(msg);
});

socket.on('disconnect', function () {
  console.log('Disconnect from server');
});
