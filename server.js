require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ msg: 'Hello' });
});

const URI = process.env.MONGODB_URL;

mongoose.connect(URI, (err) => {
  if (err) throw err;
  console.log('Connected to mongodb');
});

// Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running on port', port);
});
