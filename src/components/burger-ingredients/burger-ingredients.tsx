import { FC, useRef, useState } from "react";
import {
  TBurgerIngredient,
  TIngredientType,
  localizedIngredientType,
} from "../../services/common";
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsSection from "./ingredients-section/ingredients-section";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useAppLocation } from "../../services/hooks";

const BurgerIngredients: FC = () => {
  const location = useAppLocation();
  const navigate = useNavigate();
  const onItemSelect = (item: TBurgerIngredient) =>
    navigate(`/ingredients/${item._id}`, {
      state: { backgroundLocation: location },
    });

  const sections: TIngredientType[] = ["bun", "sauce", "main"];
  const [activeSection, updateActiveSection] = useState<string>(sections[0]);

  const onClickTab = (value: string) => {
    const currentSectionRef =
      sectionRefs[sections.indexOf(value as TIngredientType)];
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
          onItemSelect={onItemSelect}
        />
        <IngredientsSection
          ref={sauceRef}
          title={localizedIngredientType["sauce"]}
          key={"sauce"}
          ingredientType={"sauce"}
          onItemSelect={onItemSelect}
        />
        <IngredientsSection
          ref={mainRef}
          title={localizedIngredientType["main"]}
          key={"main"}
          ingredientType={"main"}
          onItemSelect={onItemSelect}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
