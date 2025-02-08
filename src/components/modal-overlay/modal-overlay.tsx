import { PropsWithChildren } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onClick: () => void;
}

export default function ModalOverlay(
  props: PropsWithChildren<ModalOverlayProps>
) {
  return (
    <div onClick={props.onClick} className={modalOverlayStyles.overlay}>
      {props.children}
    </div>
  );
}
