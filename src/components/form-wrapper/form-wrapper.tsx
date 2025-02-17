import { PropsWithChildren } from "react";
import formWrapperStyles from "./form-wrapper.module.css";

export default function FormWrapper(props: PropsWithChildren) {
  return (
    <div className={formWrapperStyles.container}>
      <div>{props.children}</div>
    </div>
  );
}
