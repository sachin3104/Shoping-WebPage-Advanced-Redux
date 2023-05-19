import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { cartUiActions } from "./Store/cartUi-slice";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let initial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cartUi.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.cartUi.Notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        cartUiActions.showNotification({
          message: "Please wait sending  cart data",
          status: "pending",
          title: "Sending...",
        })
      );

      const response = await fetch(
        "https://react-shoping-webpage-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Sending Cart data failed!!");
      }

      dispatch(
        cartUiActions.showNotification({
          message: "Cart data Sent",
          status: "success",
          title: "Sent!",
        })
      );
    };

    if (initial) {
      initial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        cartUiActions.showNotification({
          message: "Sending Cart data failed!!",
          status: "error",
          title: "Error!!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
