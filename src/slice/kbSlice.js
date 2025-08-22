import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const getAllKB = createAsyncThunk(
  "getAllKB",
  async function (token, thunkAPI) {
    try {
      const res = await axios.get(`${url}/api/v1/kb`, {
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

export const createKB = createAsyncThunk(
  "createKB",
  async function ({ formData, token }, thunkAPI) {
    try {
      const res = await axios.post(`${url}/api/v1/kb`, formData, {
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

export const deleteKB = createAsyncThunk(
  "deleteKB",
  async function ({ id, token }, thunkAPI) {
    try {
      const res = await axios.delete(`${url}/api/v1/kb/${id}`, {
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

export const getSingleKB = createAsyncThunk(
  "getSingleKB",
  async function ({ id, token }, thunkAPI) {
    try {
      const res = await axios.get(`${url}/api/v1/kb/${id}`, {
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

export const updateKB = createAsyncThunk(
  "updateKB",
  async function ({ formData, id, token }, thunkAPI) {
    try {
      const res = await axios.put(`${url}/api/v1/kb/${id}`, formData, {
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

const kbSlice = createSlice({
  name: "kb",
  initialState: {
    isLoadingKB: false,
    kbErrName: null,
    kbgErrMessage: null,
    kb: null,
    singleKB: null,
  },
  reducers: {
    clearKB(state, action) {
      state.isLoadingKB = false;
      state.kbErrName = null;
      state.kbgErrMessage = null;
      state.kb = null;
      state.singleKB = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllKB.pending, function (state, action) {
        state.isLoadingKB = true;
      })
      .addCase(getAllKB.fulfilled, function (state, action) {
        state.isLoadingKB = false;
        state.kb = action?.payload?.data?.kb;
      })
      .addCase(getAllKB.rejected, function (state, action) {
        state.isLoadingKB = false;
        state.kbgErrMessage = action?.payload?.message;
        state.kbErrName = action?.payload?.name;
      })

      // create kb
      .addCase(createKB.pending, function (state, action) {
        state.isLoadingKB = true;
      })
      .addCase(createKB.fulfilled, function (state, action) {
        state.isLoadingKB = false;
        state.singleKB = action?.payload?.data?.kb;
      })
      .addCase(createKB.rejected, function (state, action) {
        state.isLoadingKB = false;
        state.kbgErrMessage = action?.payload?.message;
        state.kbErrName = action?.payload?.name;
      })

      // delete kb
      .addCase(deleteKB.pending, function (state, action) {
        state.isLoadingKB = true;
      })
      .addCase(deleteKB.fulfilled, function (state, action) {
        state.isLoadingKB = false;
      })
      .addCase(deleteKB.rejected, function (state, action) {
        state.isLoadingKB = false;
        state.kbgErrMessage = action?.payload?.message;
        state.kbErrName = action?.payload?.name;
      })

      // get single kb
      .addCase(getSingleKB.pending, function (state, action) {
        state.isLoadingKB = true;
      })
      .addCase(getSingleKB.fulfilled, function (state, action) {
        state.isLoadingKB = false;
        state.singleKB = action?.payload?.data?.kb;
      })
      .addCase(getSingleKB.rejected, function (state, action) {
        state.isLoadingKB = false;
        state.kbgErrMessage = action?.payload?.message;
        state.kbErrName = action?.payload?.name;
      })

      //update kb
      .addCase(updateKB.pending, function (state, action) {
        state.isLoadingKB = true;
      })
      .addCase(updateKB.fulfilled, function (state, action) {
        state.isLoadingKB = false;
        state.singleKB = action?.payload?.data?.kb;
      })
      .addCase(updateKB.rejected, function (state, action) {
        state.isLoadingKB = false;
        state.kbgErrMessage = action?.payload?.message;
        state.kbErrName = action?.payload?.name;
      });
  },
});

export const { clearKB } = kbSlice.actions;

export default kbSlice.reducer;
