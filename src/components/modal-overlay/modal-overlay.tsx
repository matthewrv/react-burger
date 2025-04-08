import { FC, PropsWithChildren } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

export type TModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay: FC<PropsWithChildren<TModalOverlayProps>> = (
  props: PropsWithChildren<TModalOverlayProps>
) => {
  return (
    <div
      onClick={props.onClick}
      className={modalOverlayStyles.overlay}
      data-testid="modal-overlay"
    >
      {props.children}
    </div>
  );
};

export default ModalOverlay;
