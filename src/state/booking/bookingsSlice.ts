import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingsState } from "../../interfaces";

const initialState: BookingsState[] = [];

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingsState>) => {
      state.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<BookingsState>) => {
      const index = state.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((booking) => booking.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addBooking, updateBooking, deleteBooking } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;
