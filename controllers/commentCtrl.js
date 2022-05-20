/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Posts = require('../models/postModel');
const Comments = require('../models/commentModel');

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;

      const post = await Posts.findById(postId);

      if (!post)
        return res.status(400).json({ msg: 'This post does not exist.' });

      if (reply) {
        const cm = await Comments.findById(reply);
        if (!cm)
          return res.status(400).json({ msg: 'This comment does not exist.' });
      }

      const newComment = new Comments({
        user: req.user._id,
        content,
        tag,
        reply,
        postUserId,
        postId,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await newComment.save();

      res.json({ newComment });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body;

      await Comments.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id,
        },
        { content }
      );

      res.json({ msg: 'Update Success!' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  likeComment: async (req, res) => {
    try {
      const comment = await Comments.find({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (comment.length > 0)
        return res.status(400).json({ msg: 'You liked this comment.' });

      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ msg: 'Liked Comment!' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unLikeComment: async (req, res) => {
    try {
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.json({ msg: 'UnLiked Comment!' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //   deleteComment: async (req, res) => {},
};

module.exports = commentCtrl;
