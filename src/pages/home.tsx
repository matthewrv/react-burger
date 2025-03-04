import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import homeStyles from "./home.module.css";
import { FC } from "react";

export const HomePage: FC = () => {
  return (
    <div className={homeStyles.wrapper}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
};
