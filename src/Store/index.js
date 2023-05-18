import { configureStore } from "@reduxjs/toolkit";

import cartReduser from "./cartUi-slice";

const store = configureStore({
  reducer: { cart: cartReduser },
});

export default store;
