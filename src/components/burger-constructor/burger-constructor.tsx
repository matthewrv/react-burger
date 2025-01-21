import { BurgerIngridient } from "../../utils/data";
import constructorStyles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface SelectedIngridientsProps {
  className?: string;
  ingridients: BurgerIngridient[];
}

const BurgerConstructor = (props: SelectedIngridientsProps) => {
  const selected = props.ingridients.filter((ingridient) => ingridient.__v > 0);
  const bun = selected.find((ing) => ing.type === "bun");
  const totalPrice = selected.reduce((prev, ing) => prev + ing.price, 0);

  return (
    <section
      className={`pt-25 pb-8 pl-4 ${constructorStyles["selected-ingridients-section"]}`}
    >
      <ol className={constructorStyles["ingridients-list"]}>
        {bun && (
          <li className={constructorStyles["ingridients-list-item"]}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass="mr-4 ml-8"
            />
          </li>
        )}
        <div
          className={`pr-4 ${constructorStyles["unlocked-ingridients-list"]}`}
        >
          {selected
            .filter((ing) => ing.type !== "bun")
            .flatMap((ingridient) =>
              Array.from({ length: ingridient.__v }, () => (
                <li className={constructorStyles["ingridients-list-item"]}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingridient.name}
                    price={ingridient.price}
                    thumbnail={ingridient.image}
                  />
                </li>
              ))
            )}
        </div>
        {bun && (
          <li className={constructorStyles["ingridients-list-item"]}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              extraClass="ml-8 mr-4"
            />
          </li>
        )}
      </ol>
      <div className={`mr-4 ${constructorStyles["total-price-section"]}`}>
        <span className="text text_type_digits-medium">
          {totalPrice} <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" htmlType="button" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
