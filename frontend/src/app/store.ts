import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { studentApi } from "../service/api/apiRequest";

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});

setupListeners(store.dispatch);
