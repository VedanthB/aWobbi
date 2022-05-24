let users = [];

const SocketServer = (socket) => {
  //   event name "joinuser", we have a obj or a string () => {} -> callback
  socket.on('joinUser', (id) => {
    users.push({ id, socketId: socket.id });
    console.log('join user', { users });
  });

  socket.on('disconnect', () => {
    users = users.filter((user) => user.socketId !== socket.id);
    console.log('disconnected', { users });
  });
};

module.exports = SocketServer;
