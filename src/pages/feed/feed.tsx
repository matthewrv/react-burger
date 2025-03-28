import feedStyles from "./feed.module.css";
import { useAppLocation, useAppSelector } from "../../services/hooks";
import { TBurgerIngredient } from "../../services/common";
import FeedCard from "../../components/feed-card/feed-card";
import { Link } from "react-router-dom";
import { TOrderItem } from "../../services/orders-feed/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { connect } from "../../services/orders-feed/actions";

export default function FeedPage() {
  const dispatch = useDispatch();

  useEffect(
    () => dispatch(connect("wss://norma.nomoreparties.space/orders/all")),
    [dispatch]
  );

  const ordersFeed = useAppSelector((state) => state.ordersFeed);
  const ingridients = useAppSelector((state) => state.ingredients);
  const location = useAppLocation();

  return (
    <>
      <div className={feedStyles.content}>
        <h1
          className={`${feedStyles.header} text text_type_main-large pt-10 pb-5`}
        >
          Лента заказов
        </h1>
        <ol className={`${feedStyles.ordersFeed} pr-2`}>
          {ordersFeed.orders.map((item) => (
            <li key={item._id}>
              <Link
                className={`${feedStyles.link}`}
                to={item._id}
                state={{ backgroundLocation: location }}
              >
                <FeedCard
                  item={item}
                  ingridients={getIngridients(item, ingridients.ingredients)}
                />
              </Link>
            </li>
          ))}
        </ol>

        <div className={feedStyles.dashboard}>
          <div className={feedStyles.ordersDashboard}>
            <section className={feedStyles.ordersSection}>
              <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
              <ul className={feedStyles.ordersList}>
                {ordersFeed.orders.map(
                  (item) =>
                    item.status == "done" && (
                      <li
                        key={item._id}
                        className={`text text_type_digits-default ${feedStyles.readyAccent}`}
                      >
                        {item.number}
                      </li>
                    )
                )}
              </ul>
            </section>
            <section className={feedStyles.ordersSection}>
              <h2 className="text text_type_main-medium pb-6">В работе:</h2>
              <ul className={feedStyles.ordersList}>
                {ordersFeed.orders.map(
                  (item) =>
                    item.status == "in_progress" && (
                      <li
                        key={item._id}
                        className="text text_type_digits-default"
                      >
                        {item.number}
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
              {ordersFeed.total}
            </p>
          </section>

          <section>
            <h2 className="text text_type_main-medium">Выполнено сегодня:</h2>
            <p
              className={`text text_type_digits-large ${feedStyles.accentShadow}`}
            >
              {ordersFeed.totalToday}
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
