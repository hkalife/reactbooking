import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isWithinInterval, parseISO } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { ModalTypes } from '../enums';
import { ModalProps } from '../interfaces';
import { addBooking } from '../state/booking/bookingsSlice';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from "react-hot-toast";
import Modal from './Modal';


function Schedule() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bookings = useSelector((state: RootState) => state.bookings);
  const [beginDate, setBeginDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<ModalProps>({
    type: ModalTypes.CONFIRM,
    title: '',
    description: '',
  });

  const handleBeginDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBeginDate(event.target.value);
  };

  const handleEndDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const validateFieldsAndCheckDates = () => {
    console.log('parseIso', parseISO(beginDate))
    setOpenModal(true)
    const newInterval = {
      beginDate: parseISO(beginDate),
      endDate: parseISO(endDate),
    };
  
    for (const booking of bookings) {
      const existingInterval = {
        start: parseISO(booking.beginDate),
        end: parseISO(booking.endDate),
      };

      if (isWithinInterval(newInterval.beginDate, existingInterval)
        || isWithinInterval(newInterval.endDate, existingInterval)
      ) {
        setModalConfig({
          type: ModalTypes.WARNING,
          title: t('error_modal_title'),
          description: t('error_modal_subtitle'),
          onClickConfirm,
        })
        return
      }
    }

    setModalConfig({
      type: ModalTypes.CONFIRM,
      title: t('available_modal_title'),
      description: t('available_modal_subtitle'),
      onClickConfirm,
    })
  }

  const onClickConfirm = () => {
    dispatch(addBooking({
      id: uuidv4(),
      beginDate,
      endDate,
    }))

    toast.success(t('success_create'))
  }

  return (
    <>
      <h1 className="m-6 text-2xl font-semibold">{ t('schedule_title') }</h1>
      <div className="mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              className="mb-3 block text-base font-medium"
            >
              { t('checkin') }
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={beginDate}
              onChange={handleBeginDataChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <div className="flex justify-end">
              <p className="mt-2 text-danger">{ t('required_date_error') }</p>
            </div>
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              className="mb-3 block text-base font-medium"
            >
              { t('checkout') }
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={endDate}
              onChange={handleEndDataChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <div className="flex justify-end">
              <p className="mt-2 text-danger">{ t('required_date_error') }</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <button
          className="w-1/2 rounded-md bg-primary py-3 px-8 text-center text-base font-semibold text-white outline-none hover:opacity-90"
          onClick={() => validateFieldsAndCheckDates()}
        >
          { t('submit') }
        </button>
      </div>

      <Modal
        type={modalConfig.type}
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

export default Schedule;
