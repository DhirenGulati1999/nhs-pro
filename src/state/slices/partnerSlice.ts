import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Partner } from "@/interfaces/Partner";

interface InitialState {
    Partner : Partner,
}

const initialState : InitialState = {
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
    setPartner: (state, { payload } : PayloadAction<Partner>) => {
      state.Partner = payload;
    },
    getPartner: (state) => state
  },
});

export const { setPartner } = partnerSlice.actions

export default partnerSlice.reducer;