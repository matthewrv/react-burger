import { FC, useEffect } from "react";
import {
  useAppDispatch,
  useAppLocation,
  useAppSelector,
} from "../../services/hooks";
import OrdersPageStyles from "./orders.module.css";
import FeedCard from "../../components/feed-card/feed-card";
import { Link } from "react-router-dom";
import { connect, disconnect } from "../../services/profile-feed/actions";
import Loader from "../../components/loader/loader";
import { isValidOrder } from "../../utils/normaApi/validation";

const OrdersPage: FC = () => {
  const dispatch = useAppDispatch();
  const ordersFeed = useAppSelector((state) => state.profileFeed);
  const ingridients = useAppSelector((state) => state.ingredients);
  const mapping = new Map(ingridients.ingredients.map((i) => [i._id, i]));
  const items = ordersFeed.orders.filter((order) =>
    isValidOrder(order, new Set(mapping.keys()))
  );

  const location = useAppLocation();

  useEffect(() => {
    dispatch(connect("wss://norma.nomoreparties.space/orders"));

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <div className={`${OrdersPageStyles.wrapper} pt-9`}>
      {ordersFeed.status === "CONNECTING" ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default OrdersPage;
