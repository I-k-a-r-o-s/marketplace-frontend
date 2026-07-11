import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserState, UserType } from "../../utils/types";

const initialState: UserState = {
  currentUser: null,
  authLoading: false,
  authChecked: false,
  isUpdating: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.authLoading = true;
    },

    signInSuccess: (state, action: PayloadAction<UserType>) => {
      state.authLoading = false;
      state.currentUser = action.payload;
    },

    signInFailure: (state) => {
      state.authLoading = false;
    },

    authCheckComplete: (state) => {
      state.authChecked = true;
      state.authLoading = false;
    },

    signOutStart: (state) => {
      state.authLoading = true;
    },

    signOutSuccess: (state) => {
      state.currentUser = null;
      state.authLoading = false;
    },

    signOutFailure: (state) => {
      state.authLoading = false;
    },

    updateUserStart: (state) => {
      state.isUpdating = true;
    },

    updateUserSuccess: (state, action: PayloadAction<UserType>) => {
      state.isUpdating = false;
      state.currentUser = action.payload;
    },

    updateUserFailed: (state) => {
      state.isUpdating = false;
    },

    deleteUserStart: (state) => {
      state.isUpdating = true;
    },

    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.authLoading = false;
      state.isUpdating = false;
    },

    deleteUserFailed: (state) => {
      state.isUpdating = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  authCheckComplete,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
