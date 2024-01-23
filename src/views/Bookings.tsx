import { useState } from "react";
import { Navbar, Schedule, Listing } from "../components";
import { Screens } from "../enums";

function Bookings() {
  const [currentScreen, setCurrentScreen] = useState<number>(Screens.SCHEDULE);

  const defineScreen = (currentScreen: Screens) => {
    const screens = new Map();
    screens.set(0, <Schedule />);
    screens.set(1, <Listing />);

    return screens.get(currentScreen);
  };

  return (
    <div>
      <Navbar setScreen={setCurrentScreen} />

      <div data-testid="dynamic__component">{defineScreen(currentScreen)}</div>
    </div>
  );
}

export default Bookings;
