import { PropsWithChildren } from "react";
import errorStyles from "./error.module.css";

export interface ErrorProps {
  title?: string;
}

export default function ErrorView(props: PropsWithChildren<ErrorProps>) {
  return (
    <div className={errorStyles.error}>
      {props.title && (
        <h1 className="text text_type_main-large">{props.title}</h1>
      )}
      {props.children}
    </div>
  );
}
