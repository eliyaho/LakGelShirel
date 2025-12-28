import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const res = await fetch('/api/cart', {
      credentials: 'include',
    });
    return res.json();
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {
    changeQuantity(state, action) {
      const { id, delta } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.status = 'idle';
      });
  },
});

export const { changeQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
