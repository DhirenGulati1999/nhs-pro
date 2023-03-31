import { configureStore } from "@reduxjs/toolkit";
import partnerSlice from "./slices/partnerSlice";
import userSlice from "./slices/userSlice";
import { createWrapper } from "next-redux-wrapper";

// export const store = configureStore({
//     reducer:{
//        partner: partnerSlice,
//        user: userSlice
//     }
// })

const makeStore = () =>
  configureStore({
    reducer: {
      partnerData: partnerSlice,
      userData: userSlice,
    },
    devTools: true,
  });

// export type AppDispatch = ReturnType<AppStore["dispatch"]>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppStore = ReturnType<typeof makeStore>;
export const wrapper = createWrapper<AppStore>(makeStore);
