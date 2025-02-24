import formLinkStyles from "./form-link.module.css";
import { Link, LinkProps } from "react-router-dom";

export interface FormLinkProps extends Omit<LinkProps, "className"> {
  label: string;
}

export default function FormLink(props: FormLinkProps) {
  const { label, ...linkProps } = props;
  return (
    <div className="text text_type_main-default text_color_inactive">
      {`${props.label} `}
      <Link className={formLinkStyles.link} {...linkProps} />
    </div>
  );
}
