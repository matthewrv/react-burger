import { PropsWithChildren, RefObject, useEffect, useRef } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modals")!;

interface ModalProps {
  title?: string;
  onClose: () => void;
}

const Modal = (props: PropsWithChildren<ModalProps>) => {
  const modalRef: RefObject<HTMLDivElement> = useRef(null);

  const onKeyPressed = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.onClose();
    }
  };

  useEffect(() => {
    const dialog = modalRef.current;
    document.addEventListener("keydown", onKeyPressed);

    return () => dialog?.removeEventListener("keydown", onKeyPressed);
  }, [props.onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={props.onClose} />
      <div
        ref={modalRef}
        aria-label={props.title}
        className={`p-10 ${modalStyles.modal}`}
      >
        <div className={modalStyles.heading}>
          <p className="text text_type_main-large">{props.title}</p>
          <button
            className={`text ${modalStyles["close-button"]}`}
            type="button"
            onClick={props.onClose}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        {props.children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
