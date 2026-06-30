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
}

const initialState: UserState = {
  currentUser: null,
  authLoading: true,
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
  },
});

export const { signInStart, signInSuccess, signOut } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
