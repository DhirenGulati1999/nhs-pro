import { configureStore } from "@reduxjs/toolkit";
import partnerSlice from "./slices/partnerSlice";

export const store = configureStore({
    reducer:{
       partner: partnerSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;