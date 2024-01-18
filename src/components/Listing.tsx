import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useTranslation } from 'react-i18next';
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import Modal from "./Modal";
import { BookingsState, ModalProps } from "../interfaces";
import { useState } from "react";
import { ModalTypes } from "../enums";
import toast, { Toaster } from "react-hot-toast";
import { deleteBooking } from "../state/booking/bookingsSlice";

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
  const dispatch = useDispatch();

  const onClickConfirm = () => {
    dispatch(deleteBooking(currentBooking.id));

    toast.success(t('success_remove'));
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className="m-6 text-2xl font-semibold">{ t('bookings_title') }</h1>
      </div>

      <div className="flex">
        {bookings.length === 0 && (
          <div className="w-full bg-white shadow mx-6 p-6">
            <div className="flex justify-center">
              <ExclamationTriangleIcon className="h-12 w-12 text-danger" aria-hidden="true" />
            </div>
            <div className="flex justify-center">
              <h1 className="text-2xl ml-2 mt-2 text-danger">{ t('no_bookings') }</h1>
            </div>
          </div>
        )}
      </div>

      {bookings.map((booking, index) => (
        <div key={booking.id} className="flex">
          <div className={`w-full bg-white shadow mx-6 p-6 ${index > 0 && "border-t border-gray-200"}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{ booking.id }</h3>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Check-in: { booking.beginDate }</p>
              <a className="font-medium text-primary hover:opacity-50 cursor-pointer">{ t('edit') }</a>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Check-out: { booking.endDate }</p>
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
                { t('delete') }
              </a>
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
