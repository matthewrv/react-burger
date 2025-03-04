import { FC } from "react";
import loaderStyles from "./loader.module.css";

export type TLoaderProps = {
  title?: string;
};

const Loader: FC<TLoaderProps> = ({ title }: TLoaderProps) => {
  return (
    <div className={loaderStyles.loader}>
      {title && <h1 className="text text_type_main-medium">{title}</h1>}
      <span className={loaderStyles.spinner}></span>
      <span className="text text_type_main-default">Загрузка...</span>
    </div>
  );
};

export default Loader;
