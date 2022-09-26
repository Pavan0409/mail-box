import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import mailreducer from "./mailreducer";

const store = configureStore({
  reducer: { auth: AuthReducer, mail:mailreducer },
});

export default store;
