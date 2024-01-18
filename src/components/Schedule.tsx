import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isWithinInterval } from 'date-fns'
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { ModalTypes } from '../enums';
import { ModalProps } from '../interfaces';
import { addBooking } from '../state/booking/bookingsSlice';
import { v4 as uuidv4 } from 'uuid';
import Modal from './Modal';


function Schedule() {
  const { t } = useTranslation();
  const [beginDate, setBeginDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const bookings = useSelector((state: RootState) => state.bookings);
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
    console.log('valitade')
    setOpenModal(true)
    const newInterval = {
      beginDate: new Date(beginDate.split('-').reverse().join('-')),
      endDate: new Date(endDate.split('-').reverse().join('-')),
    };

    console.log('bookings', bookings)
  
    for (const booking of bookings) {
      const existingInterval = {
        start: new Date(booking.beginDate.split('-').reverse().join('-')),
        end: new Date(booking.endDate.split('-').reverse().join('-')),
      };
  
      if (isWithinInterval(newInterval.beginDate, existingInterval)
        || isWithinInterval(newInterval.endDate, existingInterval)
      ) {
        setModalConfig({
          type: ModalTypes.WARNING,
          title: t('error_modal_title'),
          description: t('error_modal_subtitle'),
        })
        return
      }
    }

    setModalConfig({
      type: ModalTypes.CONFIRM,
      title: t('available_modal_title'),
      description: t('available_modal_subtitle'),
      onClickConfirm: addBooking({
        id: uuidv4(),
        beginDate,
        endDate,
      })
    })
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
          className="w-1/2 rounded-md bg-primary py-3 px-8 text-center text-base font-semibold text-white outline-none"
          onClick={() => validateFieldsAndCheckDates()}
        >
          { t('submit') }
        </button>
      </div>

      <Modal
        type={modalConfig.type}
        title={modalConfig.title}
        description={modalConfig.description}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  )
}

export default Schedule;
