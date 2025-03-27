import { FC } from "react";
import { TOrderItem } from "../feed/feed";
import { useAppLocation, useAppSelector } from "../../services/hooks";
import OrdersPageStyles from "./orders.module.css";
import FeedCard from "../../components/feed-card/feed-card";
import { Link } from "react-router-dom";

const OrdersPage: FC = () => {
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
  const mapping = new Map(ingridients.ingredients.map((i) => [i._id, i]));
  const location = useAppLocation();

  return (
    <div className={`${OrdersPageStyles.wrapper} pt-9`}>
      <ul className={`${OrdersPageStyles.container} p-2`}>
        {items.map((item) => (
          <li key={item._id}>
            <Link
              to={`${item._id}`}
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
