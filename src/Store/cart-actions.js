import { cartUiActions } from "./cartUi-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-shoping-webpage-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Reciving cart data failed!!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        cartUiActions.showNotification({
          message: "Reciving Cart data failed!!",
          status: "error",
          title: "Error!!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      cartUiActions.showNotification({
        message: "Please wait sending  cart data",
        status: "pending",
        title: "Sending...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-shoping-webpage-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending Cart data failed!!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        cartUiActions.showNotification({
          message: "Cart data Sent",
          status: "success",
          title: "Sent!",
        })
      );
    } catch (error) {
      dispatch(
        cartUiActions.showNotification({
          message: "Sending Cart data failed!!",
          status: "error",
          title: "Error!!",
        })
      );
    }
  };
};
