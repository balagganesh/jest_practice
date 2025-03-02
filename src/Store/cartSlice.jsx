import { createSlice } from '@reduxjs/toolkit';
import { product } from '../assets/Assets.js';

const initialState = {
  cartItems: {},
  subtotal: 0,
  savings: 0,
  total: 0,
  products: product,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId] > 1) {
        state.cartItems[itemId] -= 1;
      } else {
        delete state.cartItems[itemId];
      }
    },
    calculateCartTotals: (state) => {
      let newSubtotal = 0;
      let newSavings = 0;

      for (const itemId in state.cartItems) {
        const quantity = state.cartItems[itemId];
        const itemInfo = state.products.find((product) => product._id === itemId);

        if (itemInfo && quantity > 0) {
          newSubtotal += itemInfo.price * quantity;

          if (itemInfo.name === "Cheese" && quantity >= 2) {
            newSavings += itemInfo.price * Math.floor(quantity / 2);
          }

          if (itemInfo.name === "Soup" && quantity >= 1) {
            const breadProduct = state.products.find((prod) => prod.name === "Bread");
            const breadId = breadProduct?._id;
            const breadQuantity = state.cartItems[breadId] || 0;
            const eligibleBreadDiscounts = Math.min(breadQuantity, quantity);

            if (breadId && breadQuantity > 0) {
              newSavings += (breadProduct.price / 2) * eligibleBreadDiscounts;
            }
          }

          if (itemInfo.name === "Butter" && quantity >= 1) {
            newSavings += (itemInfo.price / 3) * quantity;
          }
        }
      }

      state.subtotal = newSubtotal;
      state.savings = newSavings;
      state.total = newSubtotal - newSavings;
    },
  },
});

export const { addToCart, removeFromCart, calculateCartTotals } = cartSlice.actions;
export default cartSlice.reducer;
