import { ReactNode } from "react";
import { BurgerIngridient, IngridientType } from "../../utils/data";
import ingridientsStyles from "./burger-ingridients.module.css";
import IngridientsSection from "../ingridients-section/ingridients-section";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface BurgerIngridientsProps {
  children?: ReactNode;
  ingridients: BurgerIngridient[];
}

const BurgerIngridients = (props: BurgerIngridientsProps) => {
  const groupedIngridients: { [K in IngridientType]?: BurgerIngridient[] } = {};
  props.ingridients.forEach((val) => {
    groupedIngridients[val.type] = groupedIngridients[val.type] || [];
    groupedIngridients[val.type]?.push(val);
  });
  const order = ["bun", "sauce", "main"];

  return (
    <section
      className={`pt-10 ${ingridientsStyles["burger-ingridients-section"]}`}
    >
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <nav className="mb-10">
        <ul className={`${ingridientsStyles["ingridients-nav"]}`}>
          <li className="section text text_type_main-default">
            <Tab
              active={true}
              value={"bun"}
              onClick={function (value: string): void {
                location.hash = value;
              }}
            >
              Булки
            </Tab>
          </li>

          <li className="section text text_type_main-default">
            <Tab
              active={false}
              value={"sauce"}
              onClick={function (value: string): void {
                location.hash = value;
              }}
            >
              Соусы
            </Tab>
          </li>

          <li className="section text text_type_main-default">
            <Tab
              active={false}
              value={"main"}
              onClick={function (value: string): void {
                location.hash = value;
              }}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>

      <div className={ingridientsStyles["scrollable"]}>
        {Object.entries(groupedIngridients)
          .sort(([key1], [key2]) => order.indexOf(key1) - order.indexOf(key2))
          .map(([key, ingridients]) => (
            <IngridientsSection
              ingridientType={key}
              ingridients={ingridients}
            />
          ))}
      </div>
    </section>
  );
};

export default BurgerIngridients;
