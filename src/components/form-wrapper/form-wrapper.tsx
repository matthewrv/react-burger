import { FC, PropsWithChildren } from "react";
import formWrapperStyles from "./form-wrapper.module.css";

const FormWrapper: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  return (
    <div className={formWrapperStyles.container}>
      <div>{props.children}</div>
    </div>
  );
};

export default FormWrapper;
