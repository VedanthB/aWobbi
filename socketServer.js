/* eslint-disable no-underscore-dangle */
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

  // Likes
  socket.on('likePost', (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];

    const clients = users.filter((user) => ids.includes(user.id));

    console.log(newPost);

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('likeToClient', newPost);
      });
    }
  });

  socket.on('unLikePost', (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit('unLikeToClient', newPost);
      });
    }
  });
};

module.exports = SocketServer;
