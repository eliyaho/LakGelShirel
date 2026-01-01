// components/redax/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const tokenFromStorage = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  user: null,
  token: tokenFromStorage,
  isAuthenticated: !!tokenFromStorage,
  status: "idle",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message);
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
extraReducers: builder => {
  builder
    .addCase(loginUser.pending, state => {
      state.status = "loading";
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = "idle";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    })
    .addCase(loginUser.rejected, state => {
      state.status = "failed";
    })

    .addCase(registerUser.pending, state => {
      state.status = "loading";
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.status = "idle";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    })
    .addCase(registerUser.rejected, state => {
      state.status = "failed";
    });
},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
