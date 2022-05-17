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
import { setLoadingProfile } from './slices/profileSlice';
import { setAuth } from './slices/authSlice';

import { getUser, updateUserProfileInfo } from './actions/profileActions';

export {
  GLOBAL_TYPES,
  loginUser,
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
};
