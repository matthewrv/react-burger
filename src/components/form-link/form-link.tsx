import { FC } from "react";
import formLinkStyles from "./form-link.module.css";
import { Link, LinkProps } from "react-router-dom";

export interface IFormLinkProps extends Omit<LinkProps, "className"> {
  label: string;
}

const FormLink: FC<IFormLinkProps> = (props: IFormLinkProps) => {
  const { label, ...linkProps } = props;
  return (
    <div className="text text_type_main-default text_color_inactive">
      {`${label} `}
      <Link className={formLinkStyles.link} {...linkProps} />
    </div>
  );
};

export default FormLink;
