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
  //   getUser: async (req, res) => {
  //     try {
  //     } catch (error) {
  //       return res.status(500).json({ msg: error.message });
  //     }
  //   },
  //   updateUser: async (req, res) => {
  //     try {
  //     } catch (error) {
  //       return res.status(500).json({ msg: error.message });
  //     }
  //   },
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
