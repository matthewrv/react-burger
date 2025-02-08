import { useState } from "react";
import {
  BurgerIngridient,
  IngridientType,
  localizedIngridientType,
} from "../../utils/data";
import ingridientsStyles from "./burger-ingridients.module.css";
import IngridientsSection from "./ingridients-section/ingridients-section";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";

interface BurgerIngridientsProps {
  ingridients: BurgerIngridient[];
}

const BurgerIngridients = (props: BurgerIngridientsProps) => {
  const [selectedItem, setSelectedItem] = useState<BurgerIngridient | null>(
    null
  );

  const sections: IngridientType[] = ["bun", "sauce", "main"];
  const [activeSection, updateActiveSection] = useState<string>(sections[0]);

  const onClickTab = (value: string) => {
    updateActiveSection(value);
    location.hash = value;
  };

  return (
    <section
      className={`pt-10 ${ingridientsStyles["burger-ingridients-section"]}`}
    >
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

      <nav className="mb-10">
        <ul className={`${ingridientsStyles["ingridients-nav"]}`}>
          {sections.map((key) => (
            <li key={key} className="text text_type_main-default">
              <Tab
                active={activeSection === key}
                value={key}
                onClick={onClickTab}
              >
                {localizedIngridientType[key]}
              </Tab>
            </li>
          ))}
        </ul>
      </nav>

      <div className={ingridientsStyles["scrollable"]}>
        {sections.map((key) => (
          <IngridientsSection
            title={localizedIngridientType[key]}
            key={key}
            ingridientType={key}
            ingridients={props.ingridients.filter((item) => item.type == key)}
            onItemSelect={setSelectedItem}
          />
        ))}
      </div>

      {selectedItem && (
        <Modal title="Детали ингридиента" onClose={() => setSelectedItem(null)}>
          <IngredientDetails ingridient={selectedItem} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngridients;
