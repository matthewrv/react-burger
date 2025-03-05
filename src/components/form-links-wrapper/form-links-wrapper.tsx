import { FC, PropsWithChildren } from "react";
import formLinksWrapperStyles from "./form-links-wrapper.module.css";

const FormLinksWrapper: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  return <div className={formLinksWrapperStyles.links}>{props.children}</div>;
};

export default FormLinksWrapper;
