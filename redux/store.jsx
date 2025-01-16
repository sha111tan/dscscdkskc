import { configureStore } from "@reduxjs/toolkit";
import {
  registerUserSlice,
  loginSlice,
  updateSlice,
  getAllUsersSlice,
  deleteUserSlice,
} from "./user.slice";
import productSlice from "./product.slice";
import orderSlice from "./order.slice";
import cartSlice from "./cart.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Middleware to save cart items to AsyncStorage
const saveCartMiddleware = (store) => (next) => async (action) => {
  const result = next(action);
  if (
    action.type.startsWith("cart/") &&
    ["addItemToCart", "updateCartQuantity", "removeFromCart"].includes(
      action.type.split("/")[1]
    )
  ) {
    const cartItems = store.getState().cartReducer.cartItems;
    try {
      await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart items to AsyncStorage:", error);
    }
  }
  return result;
};

const store = configureStore({
  reducer: {
    registerReducer: registerUserSlice.reducer,
    loginReducer: loginSlice.reducer,
    updateUserReducer: updateSlice.reducer,
    getAllUsersReducer: getAllUsersSlice.reducer,
    deleteUserReducer: deleteUserSlice.reducer,
    productReducer: productSlice,
    orderReducer: orderSlice,
    cartReducer: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartMiddleware),
});

export default store;
