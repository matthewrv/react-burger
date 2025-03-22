import feedCardStyles from "./feed-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TBurgerIngredient } from "../../services/common";
import IngridientPreview from "../ingridient-preview/ingridient-preview";
import OrderedDate from "../ordered-date/ordered-date";

export type TFeedCardProps = {
  item: any;
  ingridients: ReadonlyArray<TBurgerIngredient>;
};

export default function FeedCard({ item, ingridients }: TFeedCardProps) {
  // TODO: fix case when count of ingridients > 6
  return (
    <article className={feedCardStyles.card}>
      <p className={feedCardStyles.cardHeader}>
        <span className="text text_type_digits-default">#{item._id}</span>
        <OrderedDate date={item.createdAt} />
      </p>
      <p className="text text_type_main-default">{item.name}</p>
      <div className={feedCardStyles.ingridientsRow}>
        <ul className={feedCardStyles.ingridients}>
          {ingridients.map((ingredient) => (
            <li>
              <IngridientPreview
                key={ingredient._id}
                image={ingredient.image}
                name={ingredient.name}
                extraClass={feedCardStyles.overlap}
              />
            </li>
          ))}
        </ul>
        <span
          className={`${feedCardStyles.price} text text_type_digits-default`}
        >
          {ingridients.reduce((prev, current) => prev + current.price, 0)}
          <CurrencyIcon type="primary" />{" "}
        </span>
      </div>
    </article>
  );
}
