import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Screens } from '../enums/Screens'

interface Props {
  setScreen: (screen: Screens) => void;
}

const Navbar: React.FC<Props> = (props) => {
  const { setScreen } = props;
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <nav className="shadow-md w-full sticky top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2x1 cursor-pointer flex items-center">
          <a className="-m-1.5 p-1.5 flex" onClick={() => setScreen(0)}>
            <h1 className="font-semibold text-primary">React</h1>
            <h1 className="font-semibold text-white bg-secondary">Booking</h1>
          </a>
        </div>
        <div className="text-3x1 absolute right-8 top-5 cursor-pointer md:hidden" onClick={() => setOpen(!open)}>
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">{ t("main_menu") }</span>
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <ul className={
          `md:flex md:items-center md:pb-0 pb-6 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-7 ${open ? 'top-19' : 'top-[-400px]'}`
          }
        >
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <button className="text-gray-800" onClick={() => setScreen(0)}>{ t("new_booking") }</button>
          </li>
          <li className="md:ml-8 text-xl">
            <button className="text-gray-800" onClick={() => setScreen(1)}>{ t("view_bookings") }</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
