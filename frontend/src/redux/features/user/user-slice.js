import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { USER_TOKEN } from '../../../constants';

const initialState = {
  token: null,
};

const localUserToken = localStorage.getItem(USER_TOKEN);
if (localUserToken) {
  const decodedToken = jwtDecode(localUserToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(USER_TOKEN);
  } else {
    initialState.token = localUserToken;
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinAction: (state, action) => {
      localStorage.setItem(USER_TOKEN, action.payload);
      state.token = action.payload;
    },
    signoutAction: (state) => {
      localStorage.removeItem(USER_TOKEN);
      state.token = null;
    },
  },
});

export const { signinAction, signoutAction } = userSlice.actions;

export default userSlice.reducer;
