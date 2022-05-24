import { GLOBAL_TYPES } from './actions/globalTypes';

import {
  loginUser,
  refreshToken,
  registerUser,
  logoutUser,
} from './actions/authActions';

import {
  setAlertLoading,
  setAlertError,
  setAlertSuccess,
} from './slices/alertSlice';

import {
  setLoadingProfile,
  setFollowUser,
  setUnFollowUser,
} from './slices/profileSlice';

import { setAuth } from './slices/authSlice';

import {
  getUser,
  updateUserProfileInfo,
  followUser,
  unFollowUser,
} from './actions/profileActions';

import { setPostModal, setEditPostModal } from './slices/postModalSlice';

import { setPosts } from './slices/postSlice';

import { setSocket } from './slices/socketSlice';

import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  savePost,
  unSavePost,
  createComment,
  updateComment,
  likeComment,
  unLikeComment,
  deleteComment,
} from './actions/postActions';

export {
  GLOBAL_TYPES,
  loginUser,
  setPosts,
  setAlertLoading,
  setAlertError,
  setAlertSuccess,
  refreshToken,
  registerUser,
  setLoadingProfile,
  logoutUser,
  getUser,
  setAuth,
  updateUserProfileInfo,
  setFollowUser,
  setUnFollowUser,
  followUser,
  unFollowUser,
  setPostModal,
  createPost,
  getPosts,
  updatePost,
  setEditPostModal,
  deletePost,
  likePost,
  unlikePost,
  savePost,
  unSavePost,
  createComment,
  updateComment,
  likeComment,
  unLikeComment,
  setSocket,
  deleteComment,
};
