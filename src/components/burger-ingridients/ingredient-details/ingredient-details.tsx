import ingredientDetailsStyles from "./ingredient-details.module.css";
import { BurgerIngridient } from "../../../utils/data";

interface IngridientDetailsProps {
  ingridient: BurgerIngridient;
}

export default function IngredientDetails(props: IngridientDetailsProps) {
  return (
    <div className={`pb-5 ${ingredientDetailsStyles.info}`}>
      <img
        className={ingredientDetailsStyles.img}
        src={props.ingridient.image_large}
        alt={props.ingridient.name}
      />
      <p className="mt-4 text text_type_main-medium text-center">
        {props.ingridient.name}
      </p>
      <ul
        className={`mt-8 ${ingredientDetailsStyles["nutrition-params-list"]}`}
      >
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Калории, ккал
          <br />
          {props.ingridient.calories}
        </li>
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Белки, г<br />
          {props.ingridient.proteins}
        </li>
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Жиры, г<br />
          {props.ingridient.fat}
        </li>
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Углеводы, г<br />
          {props.ingridient.carbohydrates}
        </li>
      </ul>
    </div>
  );
}
