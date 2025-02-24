import { PropsWithChildren, SyntheticEvent } from "react";
import formStyles from "./form.module.css";

export interface FormProps {
  title: string;
  errorMsg?: string;
  onSubmit: (e: SyntheticEvent) => void;
}

export default function Form({
  title,
  errorMsg,
  onSubmit,
  children,
}: PropsWithChildren<FormProps>) {
  return (
    <div>
      <h1 className="text text_type_main-medium text-center">{title}</h1>
      <form className={`pt-6 ${formStyles.form}`} onSubmit={onSubmit}>
        {children}
      </form>
      <div className={formStyles.error}>
        <span className="text text_type_main-default">{errorMsg}</span>
      </div>
    </div>
  );
}
