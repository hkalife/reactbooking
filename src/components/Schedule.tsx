import { useTranslation } from 'react-i18next';

function Schedule() {
  const { t } = useTranslation();

  const validateFieldsAndCheckDates = () => {
    
  }

  return (
    <>
      <h1 className="m-6 text-2xl font-semibold">{ t('schedule_title') }</h1>
      <div className="mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              for="date"
              className="mb-3 block text-base font-medium"
            >
              { t('checkin') }
            </label>
            <input
              type="date"
              name="date"
              id="date"
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
              for="date"
              className="mb-3 block text-base font-medium"
            >
              { t('checkout') }
            </label>
            <input
              type="date"
              name="date"
              id="date"
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
    </>
  )
}

export default Schedule;
