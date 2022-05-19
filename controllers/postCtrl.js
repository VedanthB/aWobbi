/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const Posts = require('../models/postModel');
// const User = require('../models/userModel');

const postCtrl = {
  createPost: async (req, res) => {
    try {
      const { images, content } = req.body;

      if (images.length === 0)
        return res.status(400).json({ msg: 'Please add your photo.' });

      const newPost = new Posts({
        content,
        images,
        user: req.user._id,
      });

      await newPost.save();

      res.json({
        msg: 'Created Post!',
        newPost: {
          ...newPost._doc,
          user: req.user,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = postCtrl;
