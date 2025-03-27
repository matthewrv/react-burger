import feedCardStyles from "./feed-card.module.css";
import { TBurgerIngredient } from "../../services/common";
import IngridientPreview from "../ingridient-preview/ingridient-preview";
import OrderedDate from "../ordered-date/ordered-date";
import PriceSpan from "../price-span/price-span";
import { TOrderItem, TOrderStatus } from "../../services/orders-feed";

export type TFeedCardProps = {
  item: TOrderItem;
  ingridients: ReadonlyArray<TBurgerIngredient>;
  displayStatus?: boolean;
};

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

  return (
    <article className={feedCardStyles.card}>
      <p className={feedCardStyles.cardHeader}>
        <span className="text text_type_digits-default">#{item._id}</span>
        <OrderedDate date={item.createdAt} />
      </p>
      <p className="text text_type_main-medium mt-6">{item.name}</p>
      {displayStatus && toDisplayStatus(item.status)}
      <div className={`${feedCardStyles.ingridientsRow} mt-6`}>
        <ul className={feedCardStyles.ingridients}>
          {ingridients.map((ingredient) => (
            <li key={ingredient._id}>
              <IngridientPreview
                image={ingredient.image}
                name={ingredient.name}
                extraClass={feedCardStyles.overlap}
              />
            </li>
          ))}
        </ul>
        <PriceSpan
          price={ingridients.reduce((prev, current) => prev + current.price, 0)}
        />
      </div>
    </article>
  );
}
