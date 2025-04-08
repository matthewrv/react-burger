import ingredientCardStyles from "./ingredient-card.module.css";
import { TBurgerIngredient } from "../../../utils/normaApi/models";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { FC } from "react";

export type TIngredientCardProps = {
  ingredient: TBurgerIngredient;
  onClick: (item: TBurgerIngredient) => void;
};

const IngredientCard: FC<TIngredientCardProps> = (
  props: TIngredientCardProps
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
      data-testid={`ingredients-item-${props.ingredient.type}`}
    >
      <img src={props.ingredient.image} alt={props.ingredient.name} />
      <span className="text text_type_digits-default text-center">
        {`${props.ingredient.price}`} <CurrencyIcon type="primary" />
      </span>
      <span
        className="text text_type_main-default text-center"
        data-testid="ingredient-title"
      >
        {props.ingredient.name}
      </span>
      {!!props.ingredient.__v && (
        <Counter count={props.ingredient.__v} size="default" />
      )}
    </article>
  );
};

export default IngredientCard;
