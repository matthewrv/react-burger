import ingridientCardStyles from "./ingridient-card.module.css";
import { BurgerIngridient } from "../../../utils/data";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IngridientCardProps {
  ingridient: BurgerIngridient;
  onClick: (item: BurgerIngridient) => void;
}

export default function IngridientCard(props: IngridientCardProps) {
  return (
    <article
      className={ingridientCardStyles["ingridient-card"]}
      onClick={() => props.onClick(props.ingridient)}
    >
      <img src={props.ingridient.image} alt={props.ingridient.name} />
      <span className="text text_type_digits-default text-center">
        {`${props.ingridient.price}`} <CurrencyIcon type="primary" />
      </span>
      <span className="text text_type_main-default text-center">
        {props.ingridient.name}
      </span>
      {!!props.ingridient.__v && (
        <Counter count={props.ingridient.__v} size="default" />
      )}
    </article>
  );
}
