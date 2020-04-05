const socketIO = io => {

  io.on( 'connection',  socket => {

    console.log( 'New user Connected: ' + socket.id );

    socket.username = 'anonymous';

    socket.on('user', (name) => {
      socket.username = name;
      console.log(name + ' Acabou de entrar no chat');
    });

    socket.on('message', (msg) => {

      io.emit('message', { 'user': socket.username, 'message': msg, 'identifier': socket.id });

      console.log({ 'user': socket.username, 'message': msg, 'identifier': socket.id });

    });

    socket.on('join_user', (username) => {
      
      if (username != null) {
        socket.username = username;
      }

      socket.broadcast.emit('message',
      { 'user': 'Server', 'message': socket.username + ' has joined!'});

    });
    
  });

}

module.exports = socketIO
