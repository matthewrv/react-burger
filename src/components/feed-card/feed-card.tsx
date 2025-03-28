import feedCardStyles from "./feed-card.module.css";
import { TBurgerIngredient } from "../../services/common";
import IngridientPreview from "../ingridient-preview/ingridient-preview";
import PriceSpan from "../price-span/price-span";
import { TOrderItem, TOrderStatus } from "../../services/orders-feed/slice";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

export type TFeedCardProps = {
  item: TOrderItem;
  ingridients: ReadonlyArray<TBurgerIngredient>;
  displayStatus?: boolean;
};

const displayLimit = 6;

export default function FeedCard({
  item,
  ingridients,
  displayStatus,
}: TFeedCardProps) {
  // TODO: fix case when count of ingridients > 6
  const toDisplayStatus = (status: TOrderStatus) => {
    const [text, stylingClass] =
      status === "done"
        ? ["Выполнен", feedCardStyles.completed]
        : status === "cancelled"
        ? ["Отменён", feedCardStyles.cancelled]
        : ["Готовится", ""];
    return (
      <p className={`${stylingClass} text text_type_main-default mt-2`}>
        {text}
      </p>
    );
  };

  const ingridientsCount = ingridients.length;
  const ingridientsSet = new Set(ingridients);

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
      {displayStatus && toDisplayStatus(item.status)}
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
        <PriceSpan
          price={ingridients.reduce((prev, current) => prev + current.price, 0)}
        />
      </div>
    </article>
  );
}
