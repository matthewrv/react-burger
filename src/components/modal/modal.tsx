import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modals")!;

export type TModalProps = {
  title?: string;
  onClose: () => void;
};

const Modal: FC<PropsWithChildren<TModalProps>> = ({
  title,
  onClose,
  children,
}: PropsWithChildren<TModalProps>) => {
  const onKeyPressed = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyPressed);

    return () => document.removeEventListener("keydown", onKeyPressed);
  }, [onClose, onKeyPressed]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div aria-label={title} className={`p-10 ${modalStyles.modal}`}>
        <div className={modalStyles.heading}>
          <p className="text text_type_main-large">{title}</p>
          <button
            className={`text ${modalStyles["close-button"]}`}
            type="button"
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
