import { User } from "@/interfaces/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    IsUserLogedIn : boolean,
    User: User
}

const initialState : InitialState = {
  IsUserLogedIn: false,
  User: {}
}

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setIsUserLogedIn: (state, { payload } : PayloadAction<boolean>) => {
      state.IsUserLogedIn = payload;
    },
    setUser: (state, { payload } : PayloadAction<User>) => {
      state.User = payload;
    },
  },
});

export const { setIsUserLogedIn, setUser } = userSlice.actions

export default userSlice.reducer;