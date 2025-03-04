import { FC, useMemo } from "react";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import * as Icons from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

export interface ITopNavItemProps {
  isActive: boolean;
  icon: keyof TICons;
  text: string;
}

const TopNavItem: FC<ITopNavItemProps> = ({
  isActive,
  icon,
  text,
}: ITopNavItemProps) => {
  const IconToRender = useMemo(() => Icons[icon], [icon]);
  return (
    <>
      <IconToRender type={isActive ? "primary" : "secondary"} />
      <span
        className={`text text_type_main-default ${
          !isActive ? "text_color_inactive" : ""
        }`}
      >
        {text}
      </span>
    </>
  );
};

export default TopNavItem;
