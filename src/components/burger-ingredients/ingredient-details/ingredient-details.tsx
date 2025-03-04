import ingredientDetailsStyles from "./ingredient-details.module.css";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../services/hooks";
import { FC, useMemo } from "react";
import Loader from "../../loader/loader";

const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { ingredients, ingredientsRequestStatus } = useAppSelector(
    (state) => state.ingredients
  );
  const ingredient = useMemo(
    () => ingredients.find((it) => it._id === id),
    [id, ingredients]
  );

  return ingredientsRequestStatus === "request" ? (
    <Loader />
  ) : !ingredient ? (
    <Navigate to="/not-found" />
  ) : (
    <div className={`pb-5 ${ingredientDetailsStyles.info}`}>
      <img
        className={ingredientDetailsStyles.img}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <p className="mt-4 text text_type_main-medium text-center">
        {ingredient.name}
      </p>
      <ul
        className={`mt-8 ${ingredientDetailsStyles["nutrition-params-list"]}`}
      >
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Калории, ккал
          <br />
          {ingredient.calories}
        </li>
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Белки, г<br />
          {ingredient.proteins}
        </li>
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Жиры, г<br />
          {ingredient.fat}
        </li>
        <li className={ingredientDetailsStyles["nutrition-info-item"]}>
          Углеводы, г<br />
          {ingredient.carbohydrates}
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
