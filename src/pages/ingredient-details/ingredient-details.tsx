import ingredientDetailsStyles from "./ingredient-details.module.css";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details";

export default function IngredientDetailsPage() {
  return (
    <div className={ingredientDetailsStyles.wrapper}>
      <h1 className="text text_type_main-large text-center">
        Детали ингредиента
      </h1>
      <IngredientDetails />
    </div>
  );
}
