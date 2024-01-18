import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useTranslation } from 'react-i18next';
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import Modal from "./Modal";
import { BookingsState, ModalProps } from "../interfaces";
import { ChangeEvent, useState } from "react";
import { ModalTypes } from "../enums";
import toast, { Toaster } from "react-hot-toast";
import { deleteBooking, updateBooking } from "../state/booking/bookingsSlice";
import { getDay, isBefore, isPast, isToday, isWithinInterval, parseISO } from "date-fns";
import { current } from "@reduxjs/toolkit";

interface DateFields {
  visible: boolean;
  id: string;
}

function Listing() {
  const { t } = useTranslation();
  const bookings = useSelector((state: RootState) => state.bookings);
  const [modalConfig, setModalConfig] = useState<ModalProps>({
    type: ModalTypes.WARNING,
    icon: ModalTypes.WARNING,
    title: '',
    description: '',
  });
  const [currentBooking, setCurrentBooking] = useState<BookingsState>({
    id: '',
    beginDate: '',
    endDate: ''
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [beginDateError, setBeginDateError] = useState<string>('');
  const [endDateError, setEndDateError] = useState<string>('');
  const [showDateFields, setShowDateFields] = useState<DateFields>({
    visible: false,
    id: ''
  });
  const dispatch = useDispatch();

  const onClickConfirm = () => {
    dispatch(deleteBooking(currentBooking.id));

    toast.success(t('success_remove'));
  }

  const handleBeginDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentBooking({
      ...currentBooking,
      beginDate: event.target.value
    });
  };

  const handleEndDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentBooking({
      ...currentBooking,
      endDate: event.target.value
    });
  };

  const validateFieldsAndCheckDates = () => {
    const errorsFoundInDates = verifyIfDatesAreValid();

    if (errorsFoundInDates) {
      return
    }

    const newInterval = {
      beginDate: parseISO(currentBooking.beginDate),
      endDate: parseISO(currentBooking.endDate),
    };
  
    for (const booking of bookings) {
      const existingInterval = {
        start: parseISO(booking.beginDate),
        end: parseISO(booking.endDate),
      };

      if (booking.id !== currentBooking.id
        && (isWithinInterval(newInterval.beginDate, existingInterval)
        || isWithinInterval(newInterval.endDate, existingInterval))
      ) {
        setOpenModal(true)
        setModalConfig({
          type: ModalTypes.WARNING,
          icon: ModalTypes.WARNING,
          title: t('error_modal_title'),
          description: t('error_modal_subtitle'),
          onClickConfirm,
        })
        return
      }
    }

    dispatch(updateBooking(currentBooking))
    setShowDateFields({
      visible: false,
      id: ''
    })
    toast.success(t('success_update'))
  }

  const verifyIfDatesAreValid = () => {
    setBeginDateError('');
    setEndDateError('');

    let hasError = false;

    console.log('currentBooking.beginDate === currentBooking.endDate', currentBooking.beginDate === currentBooking.endDate)

    hasError = !isToday(parseISO(currentBooking.beginDate)) && isPast(parseISO(currentBooking.beginDate)) && (setBeginDateError(t('checkin_past')), true) || hasError;
    hasError = (currentBooking.beginDate === '') && (setBeginDateError(t('required_date_error')), true) || hasError;
    hasError = (currentBooking.endDate === '') && (setEndDateError(t('required_date_error')), true) || hasError;
    hasError = (currentBooking.beginDate === currentBooking.endDate || isBefore(parseISO(currentBooking.endDate), parseISO(currentBooking.beginDate))) && (setEndDateError(t('checkin_before_checkout')), true) || hasError;

    return hasError;
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className="m-6 text-2xl font-semibold">{t('bookings_title')}</h1>
      </div>

      <div className="flex">
        {bookings.length === 0 && (
          <div className="w-full bg-white shadow mx-6 p-6">
            <div className="flex justify-center">
              <ExclamationTriangleIcon className="h-12 w-12 text-danger" aria-hidden="true" />
            </div>
            <div className="flex justify-center">
              <h1 className="text-2xl ml-2 mt-2 text-danger">{t('no_bookings')}</h1>
            </div>
          </div>
        )}
      </div>

      {bookings.map((booking, index) => (
        <div key={booking.id}>
          <div className="flex">
            <div className={`w-full bg-white shadow mx-6 p-6 ${index > 0 && "border-t border-gray-200"}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{ booking.id }</h3>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Check-in: {booking.beginDate}</p>
                <a
                  className="font-medium text-primary hover:opacity-50 cursor-pointer"
                  onClick={() => {
                    setShowDateFields({
                      id: booking.id,
                      visible: !showDateFields.visible
                    })
                    setCurrentBooking(booking)
                  }}
                >
                  {t('edit')}
                </a>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Check-out: {booking.endDate}</p>
                <a
                  className="font-medium text-danger hover:opacity-50 cursor-pointer"
                  onClick={() => {
                    setCurrentBooking(booking)
                    setOpenModal(true)
                    setModalConfig({
                      type: ModalTypes.CONFIRM,
                      icon: ModalTypes.WARNING,
                      title: t('sure'),
                      description: t('not_reversible'),
                    })
                  }}
                >
                  {t('delete')}
                </a>
              </div>
              {(booking.id === showDateFields.id) && showDateFields.visible && (
                <div>
                  <div className="mx-3 mt-6 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <div>
                        <label
                          className="mb-3 block text-base font-medium"
                        >
                          {t('new_checkin')}
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={currentBooking.beginDate}
                          onChange={handleBeginDataChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        <div className="flex justify-end">
                          <p className="mt-2 text-danger">{beginDateError}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <div>
                        <label
                          className="mb-3 block text-base font-medium"
                        >
                          {t('new_checkout')}
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={currentBooking.endDate}
                          onChange={handleEndDataChange}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        <div className="flex justify-end">
                          <p className="mt-2 text-danger">{endDateError}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <button
                      className="w-1/2 rounded-md bg-primary py-3 px-8 text-center text-base font-semibold text-white outline-none hover:opacity-90"
                      onClick={() => {
                        validateFieldsAndCheckDates()
                      }}
                    >
                      {t('edit')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <Modal
        type={modalConfig.type}
        icon={modalConfig.icon}
        title={modalConfig.title}
        description={modalConfig.description}
        onClickConfirm={onClickConfirm}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  )
}

export default Listing;
