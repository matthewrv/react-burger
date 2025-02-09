import { useRef, useState } from "react";
import { IngredientType, localizedIngredientType } from "../../services/common";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsSection from "./ingredients-section/ingredients-section";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  resetIngredient,
  setIngredient,
} from "../../services/ingredient-details";

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector(
    (state) => state.indgidientDetails.ingredient
  );

  const sections: IngredientType[] = ["bun", "sauce", "main"];
  const [activeSection, updateActiveSection] = useState<string>(sections[0]);

  const onClickTab = (value: string) => {
    const currentSectionRef =
      sectionRefs[sections.indexOf(value as IngredientType)];
    currentSectionRef.current!.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const sectionRefs = [bunRef, sauceRef, mainRef];

  const onScroll = () => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) {
      return;
    }

    const result = sectionRefs
      .map((ref) => ref.current!.getBoundingClientRect())
      .map(
        (box) => (containerRect.top - box.top) * (containerRect.top - box.top)
      );

    const idx = result.indexOf(Math.min(...result)); // find min
    updateActiveSection(sections[idx]);
  };

  return (
    <section
      className={`pt-10 ${ingredientsStyles["burger-ingredients-section"]}`}
    >
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

      <nav className="mb-10">
        <ul className={`${ingredientsStyles["ingredients-nav"]}`}>
          {sections.map((key) => (
            <li key={key} className="text text_type_main-default">
              <Tab
                active={activeSection === key}
                value={key}
                onClick={onClickTab}
              >
                {localizedIngredientType[key]}
              </Tab>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={ingredientsStyles["scrollable"]}
        ref={containerRef}
        onScroll={onScroll}
      >
        <IngredientsSection
          ref={bunRef}
          title={localizedIngredientType["bun"]}
          key={"bun"}
          ingredientType={"bun"}
          onItemSelect={(item) => dispatch(setIngredient(item))}
        />
        <IngredientsSection
          ref={sauceRef}
          title={localizedIngredientType["sauce"]}
          key={"sauce"}
          ingredientType={"sauce"}
          onItemSelect={(item) => dispatch(setIngredient(item))}
        />
        <IngredientsSection
          ref={mainRef}
          title={localizedIngredientType["main"]}
          key={"main"}
          ingredientType={"main"}
          onItemSelect={(item) => dispatch(setIngredient(item))}
        />
      </div>

      {selectedItem && (
        <Modal
          title="Детали ингридиента"
          onClose={() => dispatch(resetIngredient())}
        >
          <IngredientDetails ingredient={selectedItem} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
