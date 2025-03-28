import orderDetailsStyles from "./order-details.module.css";
import orderAcceptedImage from "../../../images/order-accepted.svg";
import { useAppSelector } from "../../../services/hooks";
import Loader from "../../loader/loader";
import { FC } from "react";

const OrderDetails: FC = () => {
  const { number: orderId, createOrderStatus } = useAppSelector(
    (state) => state.orderDetails
  );

  return (
    <div className={`pt-4 pb-20 ${orderDetailsStyles.details}`}>
      {createOrderStatus === "request" ? (
        <Loader title="Оформляем заказ" />
      ) : createOrderStatus === "error" ? (
        <p className="text_type_main-medium">Ошибка создания заказа :(</p>
      ) : (
        <>
          <p
            className={`text text_type_digits-large ${orderDetailsStyles.title}`}
          >
            {orderId}
          </p>
          <p className="mt-8 text text_type_main-medium">
            идентификатор заказа
          </p>
          <img className="mt-15" src={orderAcceptedImage} alt="Галочка" />
          <p className="mt-15 text text_type_main-default">
            Ваш заказ начали готовить
          </p>
          <p className="mt-2 text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
