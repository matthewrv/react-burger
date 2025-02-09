import ingredientDetailsStyles from "./ingredient-details.module.css";
import { BurgerIngredient } from "../../../services/common";

interface IngredientDetailsProps {
  ingredient: BurgerIngredient;
}

export default function IngredientDetails(props: IngredientDetailsProps) {
  return (
    <div className={`pb-5 ${ingredientDetailsStyles.info}`}>
      <img
        className={ingredientDetailsStyles.img}
        src={props.ingredient.image_large}
        alt={props.ingredient.name}
      />
      <p className="mt-4 text text_type_main-medium text-center">
        {props.ingredient.name}
      </p>
      <ul
        className={`mt-8 ${ingredientDetailsStyles["nutrition-params-list"]}`}
      >
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Калории, ккал
          <br />
          {props.ingredient.calories}
        </li>
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Белки, г<br />
          {props.ingredient.proteins}
        </li>
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Жиры, г<br />
          {props.ingredient.fat}
        </li>
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Углеводы, г<br />
          {props.ingredient.carbohydrates}
        </li>
      </ul>
    </div>
  );
}
