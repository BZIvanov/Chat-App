import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/user-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
