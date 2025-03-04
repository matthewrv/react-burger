import { FC, PropsWithChildren } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

export interface IModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay: FC<PropsWithChildren<IModalOverlayProps>> = (
  props: PropsWithChildren<IModalOverlayProps>
) => {
  return (
    <div onClick={props.onClick} className={modalOverlayStyles.overlay}>
      {props.children}
    </div>
  );
};

export default ModalOverlay;
