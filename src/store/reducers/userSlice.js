import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: Cookies.get('hsb_user') ? JSON.parse(Cookies.get('hsb_user')) : null
  },
  reducers: {
    setInfo: (state, action) => {
      const { _id, name, username, token } = action.payload;
      Cookies.set('hsb_user', JSON.stringify({ _id, name, username, token }));
      state.info = JSON.parse(Cookies.get('hsb_user')) || null;
    },
    signOut: (state) => {
      Cookies.remove('hsb_user');
      state.info = null;
    }
  }
});

export const { setInfo, signOut } = userSlice.actions;

export default userSlice.reducer;
