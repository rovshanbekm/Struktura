import { configureStore } from '@reduxjs/toolkit';

import  authReducer  from '../slices/authSlice';

const store = configureStore({
  reducer: {
    all: authReducer,
  },
});

export default store;
