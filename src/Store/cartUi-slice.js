import { createSlice } from "@reduxjs/toolkit";

const state = { showCart: false };

const cartUiSlice = createSlice({
  name: "cartUi",
  initialState: state,
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartUiActions = cartUiSlice.actions;

export default cartUiSlice.reducer;
