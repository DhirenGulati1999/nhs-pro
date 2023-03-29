import { configureStore } from "@reduxjs/toolkit";
import partnerSlice from "./slices/partnerSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer:{
       partner: partnerSlice,
       user: userSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;