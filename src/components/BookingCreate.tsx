import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { addBooking, deleteBooking, updateBooking } from "../state/booking/bookingsSlice";

const BookingCreate = () => {
  const bookings = useSelector((state: RootState) => state.bookings);
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2x1 cursor-pointer flex items-center">
          <a className="-m-1.5 p-1.5 flex">
            <h1 className="font-semibold text-primary">React</h1>
            <h1 className="font-semibold text-white bg-secondary">Booking</h1>
          </a>
        </div>
        <div className="text-3x1 absolute right-8 top-5 cursor-pointer md:hidden" onClick={() => setOpen(!open)}>
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-6 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-7 ${open ? 'top-19' : 'top-[-400px]'}`}>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <a className="text-gray-800">Schedule new booking</a>
          </li>
          <li className="md:ml-8 text-xl">
            <a className="text-gray-800">View bookings</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default BookingCreate;
