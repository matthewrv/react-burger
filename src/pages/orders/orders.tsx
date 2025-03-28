import { FC } from "react";
import { useAppLocation, useAppSelector } from "../../services/hooks";
import OrdersPageStyles from "./orders.module.css";
import FeedCard from "../../components/feed-card/feed-card";
import { Link } from "react-router-dom";

const OrdersPage: FC = () => {
  const ordersFeed = useAppSelector((state) => state.ordersFeed);
  const items = ordersFeed.orders;

  const ingridients = useAppSelector((state) => state.ingredients);
  const mapping = new Map(ingridients.ingredients.map((i) => [i._id, i]));
  const location = useAppLocation();

  return (
    <div className={`${OrdersPageStyles.wrapper} pt-9`}>
      <ul className={`${OrdersPageStyles.container} p-2`}>
        {items.map((item) => (
          <li key={item._id}>
            <Link
              to={`${item.number}`}
              state={{ backgroundLocation: location }}
              className={`${OrdersPageStyles.link}`}
            >
              <FeedCard
                item={item}
                ingridients={item.ingredients.map((id) => mapping.get(id)!)}
                displayStatus
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
