require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const { createServer } = require('http');
const SocketServer = require('./socketServer');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(cookieParser());

// socket

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  SocketServer(socket);
});

// app.get('/api', (req, res) => {
//   res.json({ msg: 'Hello' });
// });

const URI = process.env.MONGODB_URL;

mongoose.connect(URI, (err) => {
  if (err) throw err;
  console.log('Connected to mongodb');
});

// Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/messageRouter'));
app.use('/api', require('./routes/notifyRouter'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
  console.log('Server is running on port', port);
});
