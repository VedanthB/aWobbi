/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });

const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  });

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullName, email, password, userName, gender } = req.body;

      const newUserName = userName.toLowerCase().replace(/ /g, '');

      const user_name = await Users.findOne({ userName: newUserName });

      if (user_name)
        return res.status(400).json({ msg: 'This user name already exists' });

      const user_email = await Users.findOne({ email });

      if (user_email)
        return res.status(400).json({ msg: 'This email already exists' });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: 'The password must be 6 characters' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullName,
        email,
        password: passwordHash,
        userName: newUserName,
        gender,
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      await newUser.save();

      res.json({
        msg: 'Registered!',
        access_token,
        user: {
          ...newUser._doc,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }).populate(
        'followers following',
        'avatar userName fullName followers following'
      );

      if (!user)
        return res.status(400).json({ msg: 'This user does not exist!' });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ msg: 'Password is incorrect' });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        msg: 'Login Success!',
        access_token,
        user: {
          ...user._doc,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //   logout: async (req, res) => {
  //     try {
  //     } catch (error) {
  //       return res.status(500).json({ msg: error.message });
  //     }
  //   },
  //   generateAccessToken: async (req, res) => {
  //     try {
  //     } catch (error) {
  //       return res.status(500).json({ msg: error.message });
  //     }
  //   },
};

module.exports = authCtrl;
