import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNavigation: "",
  showSidebar: false,
  user: {},
  cartProducts: [],
  cartLocalStorage: [],

  cartLength: 0,
  cartTotal: 0,
};
// let localStoreItem = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

// localStoreItem.push(action.payload);
// localStorage.setItem("cartItems", JSON.stringify(localStoreItem));
export const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    updatePageNavigation: (state, action) => {
      state.pageNavigation = action.payload;
    },
    updateSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    // updateCart: (state, action) => {
    //   state.cartProducts = [
    //     ...state.cartProducts,
    //     ...state.cartLocalStorage,
    //     action.payload,
    //   ];
    //   state.cartLength = state.cartProducts?.length;
    //   state.cartLocalStorage.push(action.payload);

    //   localStorage.setItem("cartItems", JSON.stringify(state.cartLocalStorage));

    //   const totalBill = state.cartProducts.reduce((acc, item) => {
    //     return acc + item.price * item.qty;
    //   }, 0);
    //   state.cartTotal = totalBill;
    // },
    updateCart: (state, action) => {
      let { type, product } = action.payload;
      if (type === "onRefresh") {
        state.cartProducts = state.cartLocalStorage;
      } else {
        state.cartProducts = [...state.cartProducts, product];
        state.cartLocalStorage.push(product);
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "cartItems",
            JSON.stringify(state.cartLocalStorage)
          );
        }
      }
      state.cartLength = state.cartProducts?.length;

      const totalBill = state.cartProducts.reduce((acc, item) => {
        const price = item.discount ? item.discounted_price : item.price;
        return acc + price * item.qty;
      }, 0);
      state.cartTotal = totalBill;
    },

    updateCartInitialState: (state, action) => {
      state.cartLocalStorage = action.payload;
    },

    updateProductQty: (state, action) => {
      const cartProducts = state.cartProducts;
      const { type, id, qty } = action.payload;
      if (type === "decrement" && qty > 1) {
        cartProducts.map((item) => (item.id === id ? (item.qty -= 1) : item));
      } else if (type === "increment") {
        cartProducts.map((item) => (item.id === id ? (item.qty += 1) : item));
      } else return;
      const totalBill = cartProducts.reduce((acc, item) => {
        const price = item.discount ? item.discounted_price : item.price;
        return acc + price * item.qty;
      }, 0);
      state.cartTotal = totalBill;

      const cartLocalStorage = state.cartLocalStorage;
      cartLocalStorage.map((item) =>
        item.id === id ? (item.qty = qty) : item
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(cartLocalStorage));
      }
    },
    deleteCartProduct: (state, action) => {
      let cartProducts = state.cartProducts;
      const id = action.payload;
      const filterProduct = cartProducts.filter((item) => item.id !== id);
      state.cartProducts = filterProduct;
      state.cartLength = state.cartProducts?.length;
      const totalBill = state.cartProducts.reduce((acc, item) => {
        const price = item.discount ? item.discounted_price : item.price;
        return acc + price * item.qty;
      }, 0);
      state.cartTotal = totalBill;

      const filterProductLocalStorage = state.cartLocalStorage.filter(
        (item) => item.id !== id
      );

      state.cartLocalStorage = filterProductLocalStorage;
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(filterProductLocalStorage)
        );
      }
    },
  },
});

export const {
  updatePageNavigation,
  updateSidebar,
  updateUser,
  updateCart,
  updateProductQty,
  deleteCartProduct,
  updateCartInitialState,
} = featuresSlice.actions;
export const featuresReducer = featuresSlice.reducer;
