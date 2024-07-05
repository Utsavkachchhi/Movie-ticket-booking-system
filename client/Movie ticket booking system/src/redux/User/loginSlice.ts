import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface InitialStateType {
  message: string;
  error: string | null;
  isLoggedIn: boolean;
  auth: Record<string, any>; // Adjust the type according to your auth object structure
}

const initialState: InitialStateType = {
  message: "",
  error: null,
  isLoggedIn: false,
  auth: {},
};

const loginSlice = createSlice({
  name: "loginDetails",
  initialState,
  reducers: {
    LoginDetails: (state) => {
      state.message = "";
      state.error = null;
      state.isLoggedIn = true;
      state.auth = {};
    },
    LoginDetailsSuccess: (state, action: PayloadAction<any>) => {
      state.message = "";
      state.error = null;
      state.isLoggedIn = true;
      state.auth = action.payload;
    },
    LoginDetailsFailure: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = action.payload;
      state.isLoggedIn = false;
      state.auth = {};
    },
  },
});

export const { LoginDetails, LoginDetailsSuccess, LoginDetailsFailure } =
  loginSlice.actions;

export default loginSlice.reducer;
