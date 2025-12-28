import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
  name: 'headers',
  initialState: {
    loginPageStatus: false,
    shoppingsPageStatus: false,
    contactPageStatus: false,
    productsPageStatus: false,
  },
  reducers: {
    setLoginPageStatus: (state, action) => {
      state.loginPageStatus = action.payload;
    },
    setShoppingsPageStatus: (state, action) => {
      state.shoppingsPageStatus = action.payload;
    },
    setContactPageStatus: (state, action) => {
      state.contactPageStatus = action.payload;
    },
    setProductsPageStatus: (state, action) => {
      state.productsPageStatus = action.payload;
    },
  },
});

export const {
  setLoginPageStatus,
  setShoppingsPageStatus,
  setContactPageStatus,
  setProductsPageStatus,
} = headerSlice.actions;

export default headerSlice.reducer;
