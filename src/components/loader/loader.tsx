import loaderStyles from "./loader.module.css";

export default function Loader({ title }: { title?: string }) {
  return (
    <div className={loaderStyles.loader}>
      {title && <h1 className="text text_type_main-medium">{title}</h1>}
      <span className={loaderStyles.spinner}></span>
      <span className="text text_type_main-default">Загрузка...</span>
    </div>
  );
}
