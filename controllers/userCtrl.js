/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const Users = require('../models/userModel');

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select('fullName userName avatar');

      res.json({ users });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).select('-password');

      if (!user) return res.status(400).json({ msg: 'User not Found' });

      res.json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        avatar,
        userName,
        fullName,
        mobile,
        address,
        story,
        website,
        gender,
      } = req.body;

      if (!fullName)
        return res.status(400).json({ msg: 'Please add your full name.' });

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          userName,
          fullName,
          mobile,
          address,
          story,
          website,
          gender,
        }
      );

      res.json({ msg: 'Updated profile details successfully.' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //   follow: async (req, res) => {
  //     try {
  //     } catch (error) {
  //       return res.status(500).json({ msg: error.message });
  //     }
  //   },
  //   unfollow: async (req, res) => {
  //     try {
  //     } catch (error) {
  //       return res.status(500).json({ msg: error.message });
  //     }
  //   },
  //   suggestedUsers: async (req, res) => {
  //     try {
  //     } catch (error) {
  //       return res.status(500).json({ msg: error.message });
  //     }
  //   },
};

module.exports = userCtrl;
