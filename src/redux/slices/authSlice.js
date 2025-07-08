import { TOKEN } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: Cookies.get(TOKEN) ? true : false,
    cart: [],
    favourites: []
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
    DeleteAllProductCart: (state) => {
      state.cart = []
    },
    FavouriteCart: (state, action) => {
      const exisiting = state.favourites.find((el) => el.id === action.payload.id);
      if (!exisiting) {
        state.favourites.push({ ...action.payload});
      }
    },
    DeleteFavouriteCart: (state, action) => {
      state.favourites = state.favourites.filter(el => el.id !== action.payload);
    },
    DeleteAllFavoriteCart: (state) => {
      state.favourites = []
    },
    PrivatePage: (state, action) => {
      state.auth = true;
      Cookies.set(TOKEN, action.payload.token);
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((el) => el.id === action.payload)
      if(item) {
        item.quantity++
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((el) => el.id === action.payload)
      if(item.quantity > 1) {
        item.quantity--;
      } else if (item && item.quantity === 1) {
        state.cart = state.cart.filter((el) => el.id === action.payload)
      }
    },
  },
});

export const { login, logout, addToCart,deleteProduct, FavouriteCart, DeleteFavouriteCart,
   DeleteAllFavoriteCart, DeleteAllProductCart, PrivatePage, decrementQuantity, incrementQuantity } = authSlice.actions;
export default authSlice.reducer;
