import ingredientCardStyles from "./ingredient-card.module.css";
import { IBurgerIngredient } from "../../../services/common";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { FC } from "react";

export interface IIngredientCardProps {
  ingredient: IBurgerIngredient;
  onClick: (item: IBurgerIngredient) => void;
}

const IngredientCard: FC<IIngredientCardProps> = (
  props: IIngredientCardProps
) => {
  const [, dragRef] = useDrag({
    type: props.ingredient.type,
    item: { id: props.ingredient._id },
  });
  return (
    <article
      className={ingredientCardStyles["ingredient-card"]}
      onClick={() => props.onClick(props.ingredient)}
      ref={dragRef}
    >
      <img src={props.ingredient.image} alt={props.ingredient.name} />
      <span className="text text_type_digits-default text-center">
        {`${props.ingredient.price}`} <CurrencyIcon type="primary" />
      </span>
      <span className="text text_type_main-default text-center">
        {props.ingredient.name}
      </span>
      {!!props.ingredient.__v && (
        <Counter count={props.ingredient.__v} size="default" />
      )}
    </article>
  );
};

export default IngredientCard;
