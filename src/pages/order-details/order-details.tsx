import orderDetailsStyles from "./order-details.module.css";
import { useParams } from "react-router-dom";
import { useAppLocation, useAppSelector } from "../../services/hooks";
import { TBurgerIngredient } from "../../services/common";
import IngridientPreview from "../../components/ingridient-preview/ingridient-preview";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrderItem, TOrderStatus } from "../../services/orders-feed/slice";

const statusMap = new Map<TOrderStatus, [string, string]>([
  ["done", [orderDetailsStyles.completed, "Выполнен"]],
  ["cancelled", [orderDetailsStyles.cancelled, "Отменён"]],
  ["in_progress", ["", "В работе"]],
]);

export default function OrderDetailsPage() {
  const { id } = useParams();

  const orders = useAppSelector((state) => state.ordersFeed.orders);
  const item = orders.find((item) => item._id === id)!;

  const ingridients = useAppSelector((state) => state.ingredients);
  const orderIngridients = getIngridients(item, ingridients.ingredients);

  const location = useAppLocation();

  const [statusStyle, statusText] = statusMap.get(item.status)!;

  return (
    <div className={`${orderDetailsStyles.content}`}>
      {!location.state?.backgroundLocation && (
        <h1 className={`mb-10 text-center text text_type_digits-default`}>
          #{item._id}
        </h1>
      )}
      <h2 className={`text text_type_main-medium mb-3`}>{item.name}</h2>
      <p className={`text text_type_main-default mb-15 ${statusStyle}`}>
        {statusText}
      </p>
      <h3 className={`text text_type_main-medium mb-6`}>Состав:</h3>
      <ul className={`${orderDetailsStyles.ingridientsList} mb-10`}>
        {orderIngridients.map((ingridient) => (
          <li
            key={ingridient._id}
            className={`${orderDetailsStyles.ingridientItem}`}
          >
            <IngridientPreview
              image={ingridient.image}
              name={ingridient.name}
            />
            <span
              className={`${orderDetailsStyles.ingridientItemName} text text_type_main-default`}
            >
              {ingridient.name}
            </span>
            {/* TODO add ingridient item count */}
            <span
              className={`${orderDetailsStyles.price} text text_type_digits-default`}
            >
              {ingridient.price} <CurrencyIcon type="primary" />
            </span>
          </li>
        ))}
      </ul>
      <div className={`${orderDetailsStyles.summary}`}>
        <FormattedDate
          date={new Date(item.createdAt)}
          className={`text text_type_main-default text_color_inactive`}
        />
        <span
          className={`${orderDetailsStyles.price} text text_type_digits-default`}
        >
          {orderIngridients.reduce((prev, next) => prev + next.price, 0)}{" "}
          <CurrencyIcon type="primary" />
        </span>
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
