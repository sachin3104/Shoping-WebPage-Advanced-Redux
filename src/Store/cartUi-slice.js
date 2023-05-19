import { createSlice } from "@reduxjs/toolkit";

const state = { showCart: false, Notification: null };

const cartUiSlice = createSlice({
  name: "cartUi",
  initialState: state,
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, actions) {
      state.Notification = {
        title: actions.payload.title,
        message: actions.payload.message,
        status: actions.payload.status,
      };
    },
  },
});

export const cartUiActions = cartUiSlice.actions;

export default cartUiSlice.reducer;
