import orderDetailsStyles from "./order-details.module.css";
import { useParams } from "react-router-dom";
import { TOrderItem, TOrderStatus } from "../feed/feed";
import { useAppSelector } from "../../services/hooks";
import { TBurgerIngredient } from "../../services/common";
import IngridientPreview from "../../components/ingridient-preview/ingridient-preview";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderedDate from "../../components/ordered-date/ordered-date";

export type TOrderDetailsPageProps = {};

const statusMap = new Map<TOrderStatus, [string, string]>([
  ["done", [orderDetailsStyles.completed, "Выполнен"]],
  ["cancelled", [orderDetailsStyles.cancelled, "Отменён"]],
  ["in_progress", ["", "В работе"]],
]);

export default function OrderDetailsPage({}: TOrderDetailsPageProps) {
  const { id } = useParams();

  const item: TOrderItem = {
    _id: id,
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

  const ingridients = useAppSelector((state) => state.ingredients);
  const orderIngridients = getIngridients(item, ingridients.ingredients);

  const [statusStyle, statusText] = statusMap.get(item.status);

  return (
    <div className={`${orderDetailsStyles.content}`}>
      <h1 className={`mb-10 text-center text text_type_digits-default`}>
        #{item._id}
      </h1>
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
        <OrderedDate date={item.createdAt} />
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
