import ingredientDetailsStyles from "./ingredient-details.module.css";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details";
import { FC } from "react";

const IngredientDetailsPage: FC = () => {
  return (
    <div className={ingredientDetailsStyles.wrapper}>
      <h1 className="text text_type_main-large text-center">
        Детали ингредиента
      </h1>
      <IngredientDetails />
    </div>
  );
};

export default IngredientDetailsPage;
