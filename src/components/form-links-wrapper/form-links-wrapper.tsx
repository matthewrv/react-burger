import { PropsWithChildren } from "react";
import formLinksWrapperStyles from "./form-links-wrapper.module.css";

export default function FormLinksWrapper(props: PropsWithChildren) {
  return <div className={formLinksWrapperStyles.links}>{props.children}</div>;
}
