import feedStyles from "./feed.module.css";
import {
  useAppDispatch,
  useAppLocation,
  useAppSelector,
} from "../../services/hooks";
import { TBurgerIngredient } from "../../services/common";
import FeedCard from "../../components/feed-card/feed-card";
import { Link } from "react-router-dom";
import { TOrderItem } from "../../utils/normaApi/models";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/orders-feed/actions";
import { isValidOrder } from "../../utils/normaApi/validation";

export default function FeedPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect("wss://norma.nomoreparties.space/orders/all"));

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const ordersFeed = useAppSelector((state) => state.ordersFeed);
  const ingridients = useAppSelector((state) => state.ingredients);
  const location = useAppLocation();

  const validIngridientIds = new Set(ingridients.ingredients.map((i) => i._id));
  const validOrders = ordersFeed.orders.filter((order) =>
    isValidOrder(order, validIngridientIds)
  );
  const completedOrders = validOrders.filter((item) => item.status === "done");
  const pendingOrders = validOrders.filter((item) => item.status === "pending");
  const displayLimit = 20;

  return (
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
              to={item.number.toString()}
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
              {completedOrders.map(
                (item, idx) =>
                  idx < displayLimit && (
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
              {pendingOrders.map(
                (item, idx) =>
                  idx < displayLimit && (
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
          <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
          <p
            className={`text text_type_digits-large ${feedStyles.accentShadow}`}
          >
            {ordersFeed.totalToday}
          </p>
        </section>
      </div>
    </div>
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
