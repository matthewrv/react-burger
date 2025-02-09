import loaderStyles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={loaderStyles.loader}>
      <span className={loaderStyles.spinner}></span>
      <span className="text text_type_main-default">Загрузка...</span>
    </div>
  );
}
