import { Dispatch, SetStateAction } from "react";
import { ModalTypes } from "../enums";

interface ModalProps {
  type: ModalTypes;
  icon: ModalTypes;
  title: string;
  description: string;
  onClickConfirm?: () => void;
  openModal?: boolean;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}

export default ModalProps;
