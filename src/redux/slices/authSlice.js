import { TOKEN } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: Cookies.get(TOKEN) ? true : false,
    cart: [],
  },
  reducers: {
    login: (state, action) => {
      state.auth = true;
      Cookies.set(TOKEN, action.payload.token);
    },
    logout: (state) => {
      state.auth = false;
      Cookies.remove(TOKEN);
    },
    addToCart: (state, action) => {
      const exisiting = state.cart.find((el) => el.id === action.payload.id);
      if (exisiting) {
        exisiting.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteProduct: (state, action) => {
      const item = state.cart.filter((el) => el.id !== action.payload);
      state.cart = item;
    },
  },
});

export const { login, logout, addToCart,deleteProduct } = authSlice.actions;
export default authSlice.reducer;
