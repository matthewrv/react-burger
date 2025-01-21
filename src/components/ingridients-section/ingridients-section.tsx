import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIngridient,
  IngridientType,
  localizedIngridientType,
} from "../../utils/data";
import ingridientsArticleStyles from "./ingridients-section.module.css";

const IngridientsSection = (props: {
  ingridientType: IngridientType;
  ingridients: BurgerIngridient[];
}) => (
  <section>
    <h2 className="text text_type_main-medium" id={props.ingridientType}>
      {localizedIngridientType[props.ingridientType]}
    </h2>
    <ul
      className={`pt-6 pl-4 pr-4 pb-10 ${ingridientsArticleStyles["ingridients-list"]}`}
    >
      {props.ingridients.map((ingridient) => {
        return (
          <li className={ingridientsArticleStyles["ingridient-item"]}>
            <article className={ingridientsArticleStyles["ingridient-card"]}>
              <img src={ingridient.image} alt={ingridient.name} />
              <span className="text text_type_digits-default text-center">
                {`${ingridient.price}`} <CurrencyIcon type="primary" />
              </span>
              <span className="text text_type_main-default text-center">
                {ingridient.name}
              </span>
              {!!ingridient.__v && (
                <Counter count={ingridient.__v} size="default" />
              )}
            </article>
          </li>
        );
      })}
    </ul>
  </section>
);

export default IngridientsSection;
