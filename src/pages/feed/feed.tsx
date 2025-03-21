import feedStyles from "./feed.module.css";
import { useAppSelector } from "../../services/hooks";
import { TBurgerIngredient } from "../../services/common";
import FeedCard from "../../components/feed-card/feed-card";

export type TOrderItem = {
  _id: string;
  createdAt: string;
  status: "done" | "in_progress";
  name: string;
  ingredients: ReadonlyArray<string>;
};

export default function FeedPage(props) {
  const item: TOrderItem = {
    _id: "123456",
    createdAt: "2025-03-21T14:43:22.587Z",
    status: "done",
    name: "Death Star Starship Main бургер",
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa0941",
      "643d69a5c3f7b9001cfa093e",
      "643d69a5c3f7b9001cfa0942",
    ],
  };

  const items: TOrderItem[] = [
    item,
    { ...item, _id: "123455", status: "in_progress" },
    { ...item, _id: "123454", status: "in_progress" },
    { ...item, _id: "123453", status: "done" },
    { ...item, _id: "123452", status: "done" },
  ];

  const ingridients = useAppSelector((state) => state.ingredients);

  return (
    <>
      <div className={feedStyles.content}>
        <h1
          className={`${feedStyles.header} text text_type_main-large pt-10 pb-5`}
        >
          Лента заказов
        </h1>
        <ol className={`${feedStyles.ordersFeed} pr-2`}>
          {items.map((item) => (
            <li key={item._id}>
              <FeedCard
                item={item}
                ingridients={getIngridients(item, ingridients.ingredients)}
              />
            </li>
          ))}
        </ol>

        <div className={feedStyles.dashboard}>
          <div className={feedStyles.ordersDashboard}>
            <section className={feedStyles.ordersSection}>
              <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
              <ul className={feedStyles.ordersList}>
                {items.map(
                  (item) =>
                    item.status == "done" && (
                      <li
                        key={item._id}
                        className={`text text_type_digits-default ${feedStyles.readyAccent}`}
                      >
                        {item._id}
                      </li>
                    )
                )}
              </ul>
            </section>
            <section className={feedStyles.ordersSection}>
              <h2 className="text text_type_main-medium pb-6">В работе:</h2>
              <ul className={feedStyles.ordersList}>
                {items.map(
                  (item) =>
                    item.status == "in_progress" && (
                      <li
                        key={item._id}
                        className="text text_type_digits-default"
                      >
                        {item._id}
                      </li>
                    )
                )}
              </ul>
            </section>
          </div>

          <section>
            <h2 className="text text_type_main-medium">
              Выполнено за всё время:
            </h2>
            <p
              className={`text text_type_digits-large ${feedStyles.accentShadow}`}
            >
              28 756
            </p>
          </section>

          <section>
            <h2 className="text text_type_main-medium">Выполнено сегодня:</h2>
            <p
              className={`text text_type_digits-large ${feedStyles.accentShadow}`}
            >
              138
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

function getIngridients(
  item: TOrderItem,
  ingridients: ReadonlyArray<TBurgerIngredient>
) {
  const map = new Map(ingridients.map((item) => [item._id, item]));
  return item.ingredients
    .map((_id) => map.get(_id))
    .filter((ingredient) => ingredient !== undefined);
}
