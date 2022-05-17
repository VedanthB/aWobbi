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
import { getUser } from './actions/profileActions';

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
};
