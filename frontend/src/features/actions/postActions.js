import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
  uploadImage,
} from '../../utils';
import { setAlertLoading } from '../slices/alertSlice';
import { setPostsLoading } from '../slices/postSlice';

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

      showToast('Created Post', 'success');

      return { ...res.data.newPost, user: auth.user };
    } catch (error) {
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
      thunkAPI.dispatch(setPostsLoading({ loading: false }));

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
      thunkAPI.dispatch(setPostsLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ post, auth, showToast }, thunkAPI) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };

    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      await patchDataAPI(`post/${post._id}/like`, null, auth.token);

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast('Liked Post', 'success');

      return { newPost };
    } catch (error) {
      thunkAPI.dispatch(setPostsLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// export const likePost =
//   ({ post, auth, socket }) =>
//   async (dispatch) => {
//     const newPost = { ...post, likes: [...post.likes, auth.user] };
//     dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

//     socket.emit('likePost', newPost);

//     try {
//       await patchDataAPI(`post/${post._id}/like`, null, auth.token);

//       // Notify
//       const msg = {
//         id: auth.user._id,
//         text: 'like your post.',
//         recipients: [post.user._id],
//         url: `/post/${post._id}`,
//         content: post.content,
//         image: post.images[0].url,
//       };

//       dispatch(createNotify({ msg, auth, socket }));
//     } catch (err) {
//       dispatch({
//         type: GLOBALTYPES.ALERT,
//         payload: { error: err.response.data.msg },
//       });
//     }
//   };

// export const unLikePost =
//   ({ post, auth, socket }) =>
//   async (dispatch) => {
//     const newPost = {
//       ...post,
//       likes: post.likes.filter((like) => like._id !== auth.user._id),
//     };
//     dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

//     socket.emit("unLikePost", newPost);

//     try {
//       await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

//       // Notify
//       const msg = {
//         id: auth.user._id,
//         text: "like your post.",
//         recipients: [post.user._id],
//         url: `/post/${post._id}`,
//       };
//       dispatch(removeNotify({ msg, auth, socket }));
//     } catch (err) {
//       dispatch({
//         type: GLOBALTYPES.ALERT,
//         payload: { error: err.response.data.msg },
//       });
//     }
//   };

// export const deletePost =
//   ({ post, auth, socket }) =>
//   async (dispatch) => {
//     dispatch({ type: POST_TYPES.DELETE_POST, payload: post });

//     try {
//       const res = await deleteDataAPI(`post/${post._id}`, auth.token);

//       // Notify
//       const msg = {
//         id: post._id,
//         text: 'added a new post.',
//         recipients: res.data.newPost.user.followers,
//         url: `/post/${post._id}`,
//       };
//       dispatch(removeNotify({ msg, auth, socket }));
//     } catch (err) {
//       dispatch({
//         type: GLOBALTYPES.ALERT,
//         payload: { error: err.response.data.msg },
//       });
//     }
//   };
