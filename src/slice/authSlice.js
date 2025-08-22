import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const login = createAsyncThunk(
  "login",
  async function (formData, thunkAPI) {
    try {
      const res = await axios.post(`${url}/api/v1/auth/login`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "signUp",
  async function (formData, thunkAPI) {
    try {
      const res = await axios.post(`${url}/api/v1/auth/sign-up`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const getMe = createAsyncThunk(
  "getMe",
  async function (token, thunkAPI) {
    try {
      const res = await axios.get(`${url}/api/v1/auth/get-me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("help-desk-key") || null,
    isLoadingAuth: false,
    authErrName: null,
    authErrMessage: null,
    user: null,
    role: null,
  },
  reducers: {
    clearAuthError(state, action) {
      state.authErrMessage = null;
      state.authErrName = null;
    },
    clearAuth(state, action) {
      state.token = localStorage.removeItem("help-desk-key");
      state.isLoadingAuth = false;
      state.authErrName = null;
      state.authErrMessage = null;
      state.user = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, function (state, action) {
        state.isLoadingAuth = true;
      })
      .addCase(login.fulfilled, function (state, action) {
        state.isLoadingAuth = false;
        state.token = action?.payload?.data?.token;
        localStorage.setItem("help-desk-key", action?.payload?.data?.token);
      })
      .addCase(login.rejected, function (state, action) {
        state.isLoadingAuth = false;
        state.authErrMessage = action?.payload?.message;
        state.authErrName = action?.payload?.name;
      })

      //sign up
      .addCase(signUp.pending, function (state, action) {
        state.isLoadingAuth = true;
      })
      .addCase(signUp.fulfilled, function (state, action) {
        state.isLoadingAuth = false;
        state.token = action?.payload?.data?.token;
        localStorage.setItem("help-desk-key", action?.payload?.data?.token);
      })
      .addCase(signUp.rejected, function (state, action) {
        state.isLoadingAuth = false;
        state.authErrMessage = action?.payload?.message;
        state.authErrName = action?.payload?.name;
      })

      //get me
      .addCase(getMe.pending, function (state, action) {
        state.isLoadingAuth = true;
      })
      .addCase(getMe.fulfilled, function (state, action) {
        state.isLoadingAuth = false;
        state.user = action?.payload?.data?.user;
        state.role = action?.payload?.data?.user?.role;
      })
      .addCase(getMe.rejected, function (state, action) {
        state.isLoadingAuth = false;
        state.authErrMessage = action?.payload?.message;
        state.authErrName = action?.payload?.name;
      });
  },
});

export const { clearAuthError, clearAuth } = authSlice.actions;

export default authSlice.reducer;
