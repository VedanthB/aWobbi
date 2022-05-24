import { createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../../app/store';
import {
  deleteDataAPI,
  EditData,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
  DeleteData,
  uploadImage,
} from '../../utils';
import { setAlertLoading } from '../slices/alertSlice';
import { setAuth } from '../slices/authSlice';
import { setPostsLoading } from '../slices/postSlice';
import { createNotify, removeNotify } from './notifyActions';

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ content, images, auth, showToast }, thunkAPI) => {
    let media = [];

    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      if (images.length > 0) media = await uploadImage(images);

      const res = await postDataAPI(
        'posts',
        { content, images: media },
        auth.token
      );

      console.log(res);

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      //  Notify
      const msg = {
        id: res.data.newPost._id,
        text: 'added a new post.',
        recipients: res.data.newPost.user.followers,
        url: `/post/${res.data.newPost._id}`,
        content,
        image: media[0].url,
      };

      thunkAPI.dispatch(createNotify({ msg, auth, socket, showToast }));

      showToast('Created Post', 'success');

      return { ...res.data.newPost, user: auth.user };
    } catch (error) {
      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({ token, showToast }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setPostsLoading({ loading: true }));

      const res = await getDataAPI('posts', token);

      thunkAPI.dispatch(setPostsLoading({ loading: false }));

      return { ...res.data, page: 2 };
    } catch (error) {
      thunkAPI.dispatch(setPostsLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ content, images, auth, postModal, showToast }, thunkAPI) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
      postModal.editPost.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === postModal.editPost.images.length
    )
      return;

    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      if (imgNewUrl.length > 0) media = await uploadImage(imgNewUrl);

      const res = await patchDataAPI(
        `post/${postModal.editPost._id}`,
        {
          content,
          images: [...imgOldUrl, ...media],
        },
        auth.token
      );

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(res.data.msg, 'success');

      return { ...res.data.newPost };
    } catch (error) {
      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({ post, auth, showToast }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      const res = await deleteDataAPI(`post/${post._id}`, auth.token);

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(res.data.msg, 'success');

      return post;
    } catch (error) {
      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ post, auth, showToast }, thunkAPI) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };

    socket.emit('likePost', newPost);

    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      await patchDataAPI(`post/${post._id}/like`, null, auth.token);

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      // Notify
      const msg = {
        id: auth.user._id,
        text: 'like your post.',
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      thunkAPI.dispatch(createNotify({ msg, auth, socket, showToast }));

      showToast('Liked Post', 'success');

      return { ...newPost };
    } catch (error) {
      thunkAPI.dispatch(setPostsLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const unlikePost = createAsyncThunk(
  'posts/unlikePost',
  async ({ post, auth, showToast }, thunkAPI) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };

    socket.emit('unLikePost', newPost);

    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      // Notify
      const msg = {
        id: auth.user._id,
        text: 'un like your post.',
        recipients: [post.user._id],
        url: `/post/${post._id}`,
      };

      thunkAPI.dispatch(removeNotify({ msg, auth, socket }));

      showToast('UnLiked Post', 'success');

      return { ...newPost };
    } catch (error) {
      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const savePost = createAsyncThunk(
  'posts/savePost',
  async ({ post, auth, showToast }, thunkAPI) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };

    thunkAPI.dispatch(setAuth({ ...auth, user: newUser }));

    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      await patchDataAPI(`savePost/${post._id}`, null, auth.token);

      showToast('Post Saved', 'success');

      thunkAPI.dispatch(setAlertLoading({ loading: false }));
    } catch (error) {
      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const unSavePost = createAsyncThunk(
  'posts/unSavePost',
  async ({ post, auth, showToast }, thunkAPI) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post._id),
    };

    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      await patchDataAPI(`unSavePost/${post._id}`, null, auth.token);

      thunkAPI.dispatch(setAuth({ ...auth, user: newUser }));

      showToast('Post UnSaved', 'success');

      thunkAPI.dispatch(setAlertLoading({ loading: false }));
    } catch (error) {
      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const createComment = createAsyncThunk(
  'posts/createComment',
  async ({ post, newComment, auth, showToast }, thunkAPI) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };

    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };

      const res = await postDataAPI('comment', data, auth.token);

      const newData = { ...res.data.newComment, user: auth.user };

      const newPost = { ...post, comments: [...post.comments, newData] };

      socket.emit('createComment', newPost);

      //   // Notify
      const msg = {
        id: res.data.newComment._id,
        text: newComment.reply
          ? 'mentioned you in a comment.'
          : 'has commented on your post.',
        recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      thunkAPI.dispatch(createNotify({ msg, auth, socket, showToast }));

      showToast('Commented Posted', 'success');

      return { ...newPost };
    } catch (error) {
      showToast(error.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const updateComment = createAsyncThunk(
  'posts/updateComment',
  async ({ comment, post, content, auth, showToast }, thunkAPI) => {
    const newComments = EditData(post.comments, comment._id, {
      ...comment,
      content,
    });

    const newPost = { ...post, comments: newComments };

    try {
      patchDataAPI(`comment/${comment._id}`, { content }, auth.token);

      showToast('Commented Updated', 'success');

      return { ...newPost };
    } catch (error) {
      showToast(error.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const likeComment = createAsyncThunk(
  'posts/likeComment',
  async ({ comment, post, auth, showToast }, thunkAPI) => {
    try {
      const newComment = { ...comment, likes: [...comment.likes, auth.user] };

      const newComments = EditData(post.comments, comment._id, newComment);

      const newPost = { ...post, comments: newComments };

      await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);

      showToast('liked comment', 'success');
      return { ...newPost };
    } catch (error) {
      showToast(error.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const unLikeComment = createAsyncThunk(
  'posts/unLikeComment',
  async ({ comment, post, auth, showToast }, thunkAPI) => {
    try {
      const newComment = {
        ...comment,
        likes: DeleteData(comment.likes, auth.user._id),
      };

      const newComments = EditData(post.comments, comment._id, newComment);

      const newPost = { ...post, comments: newComments };

      await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token);

      showToast('UnLiked comment', 'success');

      return { ...newPost };
    } catch (error) {
      showToast(error.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'posts/unLikeComment',
  async ({ comment, post, auth, showToast }, thunkAPI) => {
    try {
      const deleteArr = [
        ...post.comments.filter((cm) => cm.reply === comment._id),
        comment,
      ];

      const newPost = {
        ...post,
        comments: post.comments.filter(
          (cm) => !deleteArr.find((da) => cm._id === da._id)
        ),
      };

      deleteArr.forEach((item) => {
        deleteDataAPI(`comment/${item._id}`, auth.token);
      });

      socket.emit('deleteComment', newPost);

      showToast('Deleted comment', 'success');

      return { ...newPost };
    } catch (error) {
      showToast(error.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
