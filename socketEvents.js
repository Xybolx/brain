module.exports = function (io) {
    const connections = {};
  
    io.sockets.on('connection', socket => {
      console.log('user connected on: ' + socket.id);
  
      socket.on('disconnect', () => {

        console.log('user disconnected from ' + socket.id);
      });

      socket.on('SEND_USER', data => {
          console.log(data);
        let user = data.username;
        connections[user] = socket;
        io.emit('RECEIVE_USER', data);
      });
      
      socket.on('SEND_MESSAGE', data => {
          console.log(data);
        io.emit('RECEIVE_MESSAGE', data);
      });
    });
  };
  