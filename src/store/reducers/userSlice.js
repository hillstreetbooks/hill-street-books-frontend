import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: Cookies.get('hsb_user') ? JSON.parse(Cookies.get('hsb_user')) : null
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
    }
  }
});

export const { setInfo, signOut } = userSlice.actions;

export default userSlice.reducer;
