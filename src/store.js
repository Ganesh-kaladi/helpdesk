import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import configReducer from "./slice/configSlice";
import kbReducer from "./slice/kbSlice";
import ticketReducer from "./slice/ticketSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
    kb: kbReducer,
    ticket: ticketReducer,
  },
});

export default store;
