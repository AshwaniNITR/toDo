// src/features/auth/authThunks.js
import { 
  login, 
  logout, 
  getCurrentUser 
} from '../../services/authService';  // Absolute path from your project root
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logoutSuccess 
} from '../../redux/reducers/authslice';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const user = await login(credentials);  // Using the imported login function
    dispatch(loginSuccess(user));
    return user;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const registerUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const user = await register(credentials.username, credentials.password);
    dispatch(loginSuccess(user));
    return user;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await logout();
    dispatch(logoutSuccess());
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Check auth state on app load
export const checkAuth = () => (dispatch) => {
  const user = getCurrentUser();
  if (user) {
    dispatch(loginSuccess(user));
  }
};
export { getCurrentUser };