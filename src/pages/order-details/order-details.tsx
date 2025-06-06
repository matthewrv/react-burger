import styles from "./order-details.module.css";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppLocation,
  useAppSelector,
} from "../../services/hooks";
import { TBurgerIngredient } from "../../utils/normaApi/models";
import IngridientPreview from "../../components/ingridient-preview/ingridient-preview";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrderItem, TOrderStatus } from "../../utils/normaApi/models";
import { useEffect, useMemo } from "react";
import { requestOrderByNumber } from "../../services/order-details/order-details";
import Loader from "../../components/loader/loader";

const statusMap = new Map<TOrderStatus, [string, string]>([
  ["done", [styles.completed, "Выполнен"]],
  ["cancelled", [styles.cancelled, "Отменён"]],
  ["pending", ["", "В работе"]],
]);

export default function OrderDetailsPage() {
  const location = useAppLocation();
  const { number: itemNumber } = useParams();

  const orders = useAppSelector((state) => state.ordersFeed.orders);
  const selectedOrder = useAppSelector((state) => state.orderDetails.order);
  const ingridients = useAppSelector((state) => state.ingredients);

  const item = useMemo(() => {
    return (
      orders.find((item) => item.number === parseInt(itemNumber!)) ||
      selectedOrder
    );
  }, [orders, selectedOrder, itemNumber]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!item) {
      dispatch(requestOrderByNumber({ number: itemNumber! }));
    }
  }, [dispatch, itemNumber, item]);

  if (!item) {
    return <Loader />;
  }

  const orderIngridients = getIngridients(item, ingridients.ingredients);
  const ingridientsSet = new Set(orderIngridients);
  const counts = new Map<string, number>();
  for (const ingridient of orderIngridients) {
    counts.set(ingridient._id, (counts.get(ingridient._id) || 0) + 1);
  }

  const [statusStyle, statusText] = statusMap.get(item.status) || ["", ""];

  return (
    <div className={`${styles.content}`}>
      {!location.state?.backgroundLocation && (
        <h1 className={`mb-10 text-center text text_type_digits-default`}>
          #{item.number}
        </h1>
      )}

      <h2 className={`text text_type_main-medium mb-3`}>{item.name}</h2>
      <p className={`text text_type_main-default mb-15 ${statusStyle}`}>
        {statusText}
      </p>

      <h3 className={`text text_type_main-medium mb-6`}>Состав:</h3>
      <ul className={`${styles.ingridientsList} mb-10`}>
        {[...ingridientsSet].map((ingridient) => (
          <li key={ingridient._id} className={`${styles.ingridientItem}`}>
            <IngridientPreview
              image={ingridient.image}
              name={ingridient.name}
            />
            <span
              className={`${styles.ingridientItemName} text text_type_main-default`}
            >
              {ingridient.name}
            </span>
            <span className={`${styles.price} text text_type_digits-default`}>
              {counts.get(ingridient._id)} {"x"} {ingridient.price}{" "}
              <CurrencyIcon type="primary" />
            </span>
          </li>
        ))}
      </ul>
      <div className={`${styles.summary}`}>
        <FormattedDate
          date={new Date(item.createdAt)}
          className={`text text_type_main-default text_color_inactive`}
        />
        <span className={`${styles.price} text text_type_digits-default`}>
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
  return item.ingredients.map((_id) => map.get(_id)).filter(notUndefined);
}

function notUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
