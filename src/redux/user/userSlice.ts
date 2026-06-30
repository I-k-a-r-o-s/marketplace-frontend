import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type User = {
  _id: string;
  userName: string;
  email: string;
};

export interface UserState {
  currentUser: User | null;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },

    signInSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },

    signOut: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
  },
});

export const { signInStart, signInSuccess, signOut } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
