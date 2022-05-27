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
  setUpdateProfilePost,
} from './slices/profileSlice';

import { setAuth } from './slices/authSlice';

import {
  getUser,
  updateUserProfileInfo,
  followUser,
  unFollowUser,
  getSuggestions,
} from './actions/profileActions';

import { setPostModal, setEditPostModal } from './slices/postModalSlice';

import { setPosts, setUpdatePost } from './slices/postSlice';

import {
  createNotify,
  removeNotify,
  getNotifies,
  isReadNotify,
  deleteAllNotifies,
} from './actions/notifyActions';

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
  getPost,
} from './actions/postActions';

import { setCreateNotify, setRemoveNotify } from './slices/notifySlice';

import {
  addMessage,
  getConversations,
  getMessages,
  loadMoreMessages,
  deleteMessages,
  deleteConversation,
} from './actions/messageAction';

import {
  setAddMessage,
  setAddUser,
  checkOnlineOffline,
} from './slices/messageSlice';

import { setOffOnline, setOnline } from './slices/onlineSlice';

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
  deleteComment,
  setUpdatePost,
  createNotify,
  removeNotify,
  getNotifies,
  setCreateNotify,
  setRemoveNotify,
  isReadNotify,
  deleteAllNotifies,
  addMessage,
  getConversations,
  getMessages,
  loadMoreMessages,
  deleteMessages,
  setAddMessage,
  deleteConversation,
  setAddUser,
  getSuggestions,
  setUpdateProfilePost,
  setOffOnline,
  setOnline,
  checkOnlineOffline,
  getPost,
};
