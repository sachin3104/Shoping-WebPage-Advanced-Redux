import { configureStore } from "@reduxjs/toolkit";

import cartUiReduser from "./cartUi-slice";
import cartReduser from "./cart-slice";

const store = configureStore({
  reducer: { cartUi: cartUiReduser, cart: cartReduser },
});

export default store;
