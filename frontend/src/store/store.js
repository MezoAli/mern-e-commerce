import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./api/productsApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    userSlice: userReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productsApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ]),
});

export default store;
