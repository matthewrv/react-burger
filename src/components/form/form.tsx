import { PropsWithChildren } from "react";
import formStyles from "./form.module.css";

export interface FormProps {
  title: string;
}

export default function Form(props: PropsWithChildren<FormProps>) {
  return (
    <div>
      <h1 className="text text_type_main-medium text-center">{props.title}</h1>
      <form className={`pt-6 pb-20 ${formStyles.form}`}>{props.children}</form>
    </div>
  );
}
