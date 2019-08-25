module.exports = function (io) {
    const connections = {};
  
    io.sockets.on('connection', socket => {
      console.log('user connected on: ' + socket.id);
  
      socket.on('disconnect', () => {
        console.log('user disconnected from ' + socket.id);
      });

      socket.on('SEND_USER', data => {
        const user = data.user;
        connections[user] = socket;
        io.emit('RECEIVE_USER', data);
      });
      
      socket.on('SEND_MESSAGE', data => {
          let room = data.movie;
        io.in(room).emit('RECEIVE_MESSAGE', data);
      });

      socket.on('SEND_MOVIE', data => {
        io.emit('RECEIVE_MOVIE', data);
      });

      socket.on('SEND_JOIN_ROOM', data => {
        let room = data.room;
        socket.join(room);
        io.in(room).emit('RECEIVE_JOIN_ROOM', data);
      });

      socket.on('SEND_LEAVE_ROOM', data => {
        let room = data.room;
        socket.leave(room);
        io.emit('RECEIVE_LEAVE_ROOM', data);
      });

    });
  };
  