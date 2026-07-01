import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  _id: string;
  userName: string;
  email: string;
};

export interface UserState {
  currentUser: User | null;
  authLoading: boolean;
  isUpdating: boolean;
}

const initialState: UserState = {
  currentUser: null,
  authLoading: true,
  isUpdating: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.authLoading = true;
    },

    signInSuccess: (state, action: PayloadAction<User>) => {
      state.authLoading = false;
      state.currentUser = action.payload;
    },

    signOut: (state) => {
      state.currentUser = null;
      state.authLoading = false;
    },

    updateUserStart: (state) => {
      state.isUpdating = true;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.isUpdating = false;
      state.currentUser = action.payload;
    },
    updateUserFailed: (state) => {
      state.isUpdating = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signOut,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
