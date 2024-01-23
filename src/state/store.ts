import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./booking/bookingsSlice";

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
