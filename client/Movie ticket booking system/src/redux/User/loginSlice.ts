import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  error: null,
  isLoggedIn: false,
  auth: {},
};

const loginSlice = createSlice({
  name: "mentorDetail",
  initialState,
  reducers: {
    LoginDetails: (state, action) => {
      state.message = "";
      state.error = null;
      state.isLoggedIn = true;
      state.auth = {};
    },
    LoginDetailsSuccess: (state, action) => {
      state.message = "";
      state.error = null;
      state.isLoggedIn = false;
      state.auth = action?.payload;
    },
    LoginDetailsFailure: (state, action) => {
      state.message = action?.payload;
      state.error = action?.payload;
      state.isLoggedIn = false;
      state.auth = {};
    },
  },
});

export const { LoginDetails, LoginDetailsSuccess, LoginDetailsFailure } =
  loginSlice.actions;
export default loginSlice.reducer;
