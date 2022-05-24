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
  follow: async (req, res) => {
    try {
      const user = await Users.find({
        _id: req.params.id,
        followers: req.user._id, // to check if the user is already following the user
      });

      if (user.length > 0)
        return res
          .status(500)
          .json({ msg: 'You have already followed this user.' });

      // find the user to follow and update the user's followers with your id
      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user._id },
        },
        {
          new: true,
        }
      );

      // update in the user's following the id of the user just followed
      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.params.id },
        },
        {
          new: true,
        }
      );

      return res.json({ newUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unfollow: async (req, res) => {
    try {
      // find the user to un follow and remove the user id from followers
      const newUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      ).populate('followers following', '-password');

      // remove the user id of the user just un followed in user's following
      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );

      res.json({ newUser });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  suggestedUsers: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 10;

      const users = await Users.aggregate([
        { $match: { _id: { $nin: newArr } } },
        { $sample: { size: Number(num) } },
        {
          $lookup: {
            from: 'users',
            localField: 'followers',
            foreignField: '_id',
            as: 'followers',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'following',
            foreignField: '_id',
            as: 'following',
          },
        },
      ]).project('-password');

      return res.json({
        users,
        result: users.length,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
