import { PropsWithChildren } from "react";
import formStyles from "./form.module.css";

export interface FormProps {
  title: string;
  errorMsg?: string;
}

export default function Form(props: PropsWithChildren<FormProps>) {
  return (
    <div>
      <h1 className="text text_type_main-medium text-center">{props.title}</h1>
      <form className={`pt-6 ${formStyles.form}`}>{props.children}</form>
      <div className={formStyles.error}>
        <span className="text text_type_main-default">{props.errorMsg}</span>
      </div>
    </div>
  );
}
