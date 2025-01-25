import { BurgerIngridient, IngridientType } from "../../../utils/data";
import ingridientsArticleStyles from "./ingridients-section.module.css";
import IngridientCard from "../ingridient-card/ingridient-card";

const IngridientsSection = (props: {
  title: string;
  ingridientType: IngridientType;
  ingridients: BurgerIngridient[];
  onItemSelect: (item: BurgerIngridient) => void;
}) => {
  return (
    <section>
      <h2 className="text text_type_main-medium" id={props.ingridientType}>
        {props.title}
      </h2>
      <ul
        className={`pt-6 pl-4 pr-4 pb-10 ${ingridientsArticleStyles["ingridients-list"]}`}
      >
        {props.ingridients.map((ingridient) => {
          return (
            <li
              key={ingridient._id}
              className={ingridientsArticleStyles["ingridient-item"]}
            >
              <IngridientCard
                ingridient={ingridient}
                onClick={props.onItemSelect}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default IngridientsSection;
