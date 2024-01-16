import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Navbar, Schedule, Listing } from "../components";
import { Screens } from '../enums/Screens.ts'
import { addBooking, deleteBooking, updateBooking } from "../state/booking/bookingsSlice";

function Bookings() {
  const [currentScreen, setCurrentScreen] = useState<number>(Screens.SCHEDULE)
  const bookings = useSelector((state: RootState) => state.bookings);
  const dispatch = useDispatch();

  const defineScreen = (currentScreen: Screens) => {
    const screens = new Map();
    screens.set(0, <Schedule />)
    screens.set(1, <Listing />)

    return screens.get(currentScreen)
  }

  return (
    <div>
      <Navbar setScreen={setCurrentScreen} />

      <div id="dynamic-component">{ defineScreen(currentScreen) }</div>
    </div>
  );
}

export default Bookings;
