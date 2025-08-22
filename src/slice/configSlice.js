import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const getConfig = createAsyncThunk(
  "getConfig",
  async function (token, thunkAPI) {
    try {
      const res = await axios.get(`${url}/api/v1/config`, {
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

export const updateConfig = createAsyncThunk(
  "updateConfig",
  async function ({ formData, id, token }, thunkAPI) {
    try {
      const res = await axios.put(`${url}/api/v1/config/${id}`, formData, {
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

const configSlice = createSlice({
  name: "config",
  initialState: {
    isLoadingConfig: false,
    configErrName: null,
    configErrMessage: null,
    config: null,
  },
  reducers: {
    clearConfig(state, action) {
      state.isLoadingConfig = false;
      state.configErrName = null;
      state.configErrMessage = null;
      state.config = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.pending, function (state, action) {
        state.isLoadingConfig = true;
      })
      .addCase(getConfig.fulfilled, function (state, action) {
        state.isLoadingConfig = false;
        state.config = action?.payload?.data?.config[0];
      })
      .addCase(getConfig.rejected, function (state, action) {
        state.isLoadingConfig = false;
        state.configErrMessage = action?.payload?.message;
        state.configErrName = action?.payload?.name;
      })

      // update config
      .addCase(updateConfig.pending, function (state, action) {
        state.isLoadingConfig = true;
      })
      .addCase(updateConfig.fulfilled, function (state, action) {
        state.isLoadingConfig = false;
        state.config = action?.payload?.data?.config;
      })
      .addCase(updateConfig.rejected, function (state, action) {
        state.isLoadingConfig = false;
        state.configErrMessage = action?.payload?.message;
        state.configErrName = action?.payload?.name;
      });
  },
});

export const { clearConfig } = configSlice.actions;

export default configSlice.reducer;
