import feedCardStyles from "./feed-card.module.css";
import { TBurgerIngredient } from "../../services/common";
import IngridientPreview from "../ingridient-preview/ingridient-preview";
import PriceSpan from "../price-span/price-span";
import { TOrderItem, TOrderStatus } from "../../utils/normaApi/models";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

export type TFeedCardProps = {
  item: TOrderItem;
  ingridients: ReadonlyArray<TBurgerIngredient>;
  displayStatus?: boolean;
};

const displayLimit = 6;
const statusMap = new Map<TOrderStatus, [string, string]>([
  ["done", [feedCardStyles.completed, "Выполнен"]],
  ["cancelled", [feedCardStyles.cancelled, "Отменён"]],
  ["in_progress", ["", "В работе"]],
]);

export default function FeedCard({
  item,
  ingridients,
  displayStatus,
}: TFeedCardProps) {
  const ingridientsCount = ingridients.length;
  const ingridientsSet = new Set(ingridients);
  const [stylingClass, text] = statusMap.get(item.status) || ["", ""];

  return (
    <article className={feedCardStyles.card}>
      <p className={feedCardStyles.cardHeader}>
        <span className="text text_type_digits-default">#{item.number}</span>
        <FormattedDate
          date={new Date(item.createdAt)}
          className={`text text_type_main-default text_color_inactive`}
        />
      </p>
      <p className="text text_type_main-medium mt-6">{item.name}</p>

      {displayStatus && (
        <p className={`${stylingClass} text text_type_main-default mt-2`}>
          {text}
        </p>
      )}

      <div className={`${feedCardStyles.ingridientsRow} mt-6`}>
        <ul className={feedCardStyles.ingridients}>
          {[...ingridientsSet].map((ingredient, index) => {
            if (index + 1 < displayLimit) {
              return (
                <li key={ingredient._id}>
                  <IngridientPreview
                    image={ingredient.image}
                    name={ingredient.name}
                    extraClass={feedCardStyles.overlap}
                  />
                </li>
              );
            }
            if (index + 1 === displayLimit) {
              return (
                <li key={ingredient._id}>
                  <IngridientPreview
                    image={ingredient.image}
                    name={ingredient.name}
                    extraClass={feedCardStyles.overlap}
                    overlimit={ingridientsCount - displayLimit}
                  />
                </li>
              );
            }
            return null;
          })}
        </ul>
        <span
          className={`${feedCardStyles.price} text text_type_digits-default`}
        >
          {ingridients.reduce((prev, current) => prev + current.price, 0)}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </article>
  );
}
