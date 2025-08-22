import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export const getAllTickets = createAsyncThunk(
  "getAllTickets",
  async function (token, thunkAPI) {
    try {
      const res = await axios.get(`${url}/api/v1/tickets`, {
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

export const createTicket = createAsyncThunk(
  "createTicket",
  async function ({ formData, token }, thunkAPI) {
    try {
      const res = await axios.post(`${url}/api/v1/tickets`, formData, {
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

export const getSingleTicket = createAsyncThunk(
  "getSingleTicket",
  async function ({ id, token }, thunkAPI) {
    try {
      const res = await axios.get(`${url}/api/v1/tickets/${id}`, {
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

const ticketslice = createSlice({
  name: "kb",
  initialState: {
    isLoadingTicket: false,
    ticketErrName: null,
    ticketErrMessage: null,
    ticket: null,
    singleTicket: null,
  },
  reducers: {
    clearTicket(state, action) {
      state.isLoadingTicket = false;
      state.ticketErrName = null;
      state.ticketErrMessage = null;
      state.ticket = null;
      state.singleTicket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, function (state, action) {
        state.isLoadingTicket = true;
      })
      .addCase(getAllTickets.fulfilled, function (state, action) {
        state.isLoadingTicket = false;
        state.ticket = action?.payload?.data?.ticket;
      })
      .addCase(getAllTickets.rejected, function (state, action) {
        state.isLoadingTicket = false;
        state.ticketErrMessage = action?.payload?.message;
        state.ticketErrName = action?.payload?.name;
      })

      // create ticket
      .addCase(createTicket.pending, function (state, action) {
        state.isLoadingTicket = true;
      })
      .addCase(createTicket.fulfilled, function (state, action) {
        state.isLoadingTicket = false;
        state.singleTicket = action?.payload?.data?.ticket;
      })
      .addCase(createTicket.rejected, function (state, action) {
        state.isLoadingTicket = false;
        state.ticketErrMessage = action?.payload?.message;
        state.ticketErrName = action?.payload?.name;
      })

      // get single ticket
      .addCase(getSingleTicket.pending, function (state, action) {
        state.isLoadingTicket = true;
      })
      .addCase(getSingleTicket.fulfilled, function (state, action) {
        state.isLoadingTicket = false;
        state.singleTicket = action?.payload?.data?.ticket;
      })
      .addCase(getSingleTicket.rejected, function (state, action) {
        state.isLoadingTicket = false;
        state.ticketErrMessage = action?.payload?.message;
        state.ticketErrName = action?.payload?.name;
      });
  },
});

export const { clearTicket } = ticketslice.actions;

export default ticketslice.reducer;
