import feedCardStyles from "./feed-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TBurgerIngredient } from "../../services/common";

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
        <time
          className={`text text_type_main-default text_color_inactive`}
          dateTime={item.createdAt}
        >
          {formatDate(item.createdAt)}
        </time>
      </p>
      <p className="text text_type_main-default">{item.name}</p>
      <div className={feedCardStyles.ingridientsRow}>
        <ul className={feedCardStyles.ingridients}>
          {ingridients.map((ingredient) => (
            <li>
              <img
                className={feedCardStyles.ingridientImage}
                key={ingredient._id}
                src={ingredient.image}
                alt={ingredient.name}
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

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const toMidnightTimestamp = (datetime: Date) =>
    new Date(datetime.toDateString()).getTime();
  const daysAgo =
    (toMidnightTimestamp(new Date()) - toMidnightTimestamp(date)) /
    (60 * 60 * 24 * 1000);

  const daysAgoString =
    daysAgo == 0
      ? "Сегодня"
      : daysAgo == 1
      ? "Вчера"
      : `${daysAgo} ${plural(daysAgo, ["день", "дня", "дней"])} назад`;

  return `${daysAgoString}, ${date.getHours()}:${date.getMinutes()}`;
}

function plural(num: number, words: [string, string, string]): string {
  var cases = [2, 0, 1, 1, 1, 2];
  return words[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[Math.min(num % 10, 5)]
  ];
}
