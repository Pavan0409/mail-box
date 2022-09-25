import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { 
    isAuthenticated: false,
    idToken: "",
    email:"",
    cleanEmail:"", 
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state,action) {
      state.isAuthenticated = true;
      state.idToken = action.payload;
    },
    logout(state){
        state.isAuthenticated = false;
    },
    setEmail(state,action){
        state.email = action.payload;
    },
    setCleanEmail(state,action){
        state.cleanEmail = action.payload;
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
