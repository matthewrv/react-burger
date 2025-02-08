import { IngredientType } from "../../../services/common";
import { BurgerIngredient } from "../../../services/common";
import ingredientsArticleStyles from "./ingredients-section.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";
import { forwardRef } from "react";

const IngredientsSection = forwardRef(
  (
    props: {
      title: string;
      ingredientType: IngredientType;
      onItemSelect: (item: BurgerIngredient) => void;
    },
    ref
  ) => {
    const ingredients = useSelector(
      (state: RootState) => state.ingredients.ingredients
    ).filter((item) => item.type === props.ingredientType);

    return (
      <section>
        <h2
          className="text text_type_main-medium"
          id={props.ingredientType}
          ref={ref}
        >
          {props.title}
        </h2>
        <ul
          className={`pt-6 pl-4 pr-4 pb-10 ${ingredientsArticleStyles["ingredients-list"]}`}
        >
          {ingredients.map((ingredient) => {
            return (
              <li
                key={ingredient._id}
                className={ingredientsArticleStyles["ingredient-item"]}
              >
                <IngredientCard
                  ingredient={ingredient}
                  onClick={props.onItemSelect}
                />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
);

export default IngredientsSection;
