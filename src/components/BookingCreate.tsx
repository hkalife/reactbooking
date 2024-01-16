import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { addBooking, deleteBooking, updateBooking } from "../state/booking/bookingsSlice";

const BookingCreate = () => {
  const bookings = useSelector((state: RootState) => state.bookings);
  const dispatch = useDispatch();

  return (
    <div>
      { bookings.map((booking) => (
          <div key={booking.id}>
            <h1>{ booking.id }</h1>
            <h1>{ booking.beginDate }</h1>
            <h1>{ booking.endDate }</h1>
          </div>
        ))
      }
      <div>
        <button onClick={() => dispatch(addBooking({ id: '1', beginDate: 'today', endDate: 'tomorrow'}))}>Add</button>
        <button onClick={() => dispatch(updateBooking({ id: '1', beginDate: 'tomorrow', endDate: 'day after tomorrow'}))}>Update</button>
        <button onClick={() => dispatch(deleteBooking('1'))}>Remove</button>
      </div>
    </div>
  );
}

export default BookingCreate;
