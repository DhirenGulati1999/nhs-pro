import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Partner } from "@/interfaces/Partner";
import { HYDRATE } from "next-redux-wrapper";

interface InitialState {
  Partner: Partner;
}

const initialState: InitialState = {
  Partner: {
    PartnerId: 0,
    PrivateLabelSite: "",
    PartnerLogo: "",
  },
};

const partnerSlice = createSlice({
  name: "Partner",
  initialState,
  reducers: {
    setPartner: (state, { payload }: PayloadAction<Partner>) => {
      state.Partner = payload;
    },
    getPartner: (state) => state,
  },
  // Special reducer for hydrating the state
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          ...action.payload.partnerData,
        };
      });
  }
});

export const { setPartner } = partnerSlice.actions;

export default partnerSlice.reducer;
