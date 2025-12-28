import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './headerSlice';
import cartReducer from './cartSlice'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    headers: headerReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
