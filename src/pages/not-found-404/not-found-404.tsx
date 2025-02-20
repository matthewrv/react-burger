import notFoundStyles from "./not-found-404.module.css";
import notFoundImg from "../../images/not-found.png";

export default function NotFound404() {
  return (
    <div className={notFoundStyles.wrapper}>
      <h1 className="text text_type_main-large">
        Возможно, наши архивы неполны
      </h1>
      <img
        src={notFoundImg}
        alt="Оби-Ван Кеноби из трилогии приквелов к звёздным войнам: It ought to be here... but it isn't"
        className={notFoundStyles.img}
      />
      <p className="text text_type_main-medium">Страница не найдена</p>
    </div>
  );
}
