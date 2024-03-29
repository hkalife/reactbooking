import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { ModalTypes } from "../enums";
import { useTranslation } from "react-i18next";
import { ModalProps } from "../interfaces";

const Modal: React.FC<ModalProps> = (props) => {
  const {
    type,
    title,
    description,
    onClickConfirm,
    openModal,
    setOpenModal,
    icon,
  } = props;
  const { t } = useTranslation();

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root
      show={openModal}
      as={Fragment}
      data-testid="modal__component"
    >
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpenModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      {icon === ModalTypes.WARNING ? (
                        <ExclamationTriangleIcon
                          data-testid="icon__modal--warning"
                          className="h-6 w-6 text-danger"
                          aria-hidden="true"
                        />
                      ) : (
                        <CheckCircleIcon
                          data-testid="icon__modal--circle"
                          className="h-6 w-6 text-success"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {type === ModalTypes.CONFIRM && (
                    <button
                      type="button"
                      data-testid="modal__button--confirm"
                      className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setOpenModal && setOpenModal(false);
                        onClickConfirm && onClickConfirm();
                      }}
                    >
                      {t("confirm")}
                    </button>
                  )}
                  <button
                    type="button"
                    data-testid="modal__button--cancel"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:opacity-90 sm:mt-0 sm:w-auto"
                    onClick={() => setOpenModal && setOpenModal(false)}
                    ref={cancelButtonRef}
                  >
                    {t("cancel")}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
