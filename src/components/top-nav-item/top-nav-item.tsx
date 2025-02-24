import { useMemo } from "react";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import * as Icons from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

export interface TopNavItemProps {
  isActive: boolean;
  icon: keyof TICons;
  text: string;
}

export default function TopNavItem({ isActive, icon, text }: TopNavItemProps) {
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
}
