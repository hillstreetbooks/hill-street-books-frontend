import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: Cookies.get('hsb_user') ? JSON.parse(Cookies.get('hsb_user')) : null,
    notifications: []
  },
  reducers: {
    setInfo: (state, action) => {
      let userInfo = state.info || {};
      Object.keys(action.payload).forEach((key) => {
        userInfo[key] = action.payload[key];
      });
      Cookies.set('hsb_user', JSON.stringify(userInfo));
      state.info = userInfo || null;
    },
    signOut: (state) => {
      Cookies.remove('hsb_user');
      state.info = null;
    },
    setAdminNotifications: (state, { payload }) => {
      state.notifications = payload;
    }
  }
});

export const { setAdminNotifications, setInfo, signOut } = userSlice.actions;

export default userSlice.reducer;
