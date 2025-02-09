import { useMemo, useState } from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "./order-details/order-details";
import Modal from "../modal/modal";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { checkoutOrder } from "../../services/order-details";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  removeIngredient,
  SelectedIngredientItem,
  setBun,
} from "../../services/selected-ingredients";
import {
  decreaseItemCount,
  increaseItemCount,
} from "../../services/ingredients";
import ConstructorItem from "./constructor-item/constructor-item";

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();

  const ingredientsMap = new Map(
    useAppSelector((state) => state.ingredients.ingredients).map((item) => [
      item._id,
      item,
    ])
  );

  const { ingredients, bun } = useAppSelector(
    (state) => state.selectedIngredients
  );

  const selected = ingredients.map(
    (item) => ingredientsMap.get(item.ingredientId)!
  );
  const bunIngredient = bun && ingredientsMap.get(bun.ingredientId)!;

  const totalPrice = useMemo(
    () =>
      selected.reduce((total, ingredient) => total + ingredient.price, 0) +
      (bunIngredient ? bunIngredient.price * 2 : 0),
    [selected, bunIngredient]
  );

  const [{ enableOutline }, dropRef] = useDrop({
    accept: ["bun", "sauce", "main"],
    drop(payload: { id: string }, monitor) {
      switch (monitor.getItemType()) {
        case "bun": {
          if (bun) {
            dispatch(decreaseItemCount({ id: bun.ingredientId }));
            dispatch(decreaseItemCount({ id: bun.ingredientId }));
          }
          dispatch(setBun(payload.id));
          dispatch(increaseItemCount(payload));
          dispatch(increaseItemCount(payload));
          break;
        }
        default: {
          dispatch(addIngredient(payload.id));
          dispatch(increaseItemCount(payload));
        }
      }
    },
    collect: (monitor) => ({
      enableOutline: monitor.isOver(),
    }),
  });

  const onDeleteItem = (item: SelectedIngredientItem) => {
    dispatch(removeIngredient({ id: item.id }));
    dispatch(decreaseItemCount({ id: item.ingredientId }));
  };

  const [detailsVisible, updateDetailsVisible] = useState(false);
  const onClickCheckout = () => {
    dispatch(
      checkoutOrder({
        ingredients: [bun, ...ingredients, bun]
          .filter((item) => item !== null)
          .map((item) => item.ingredientId),
      })
    );
    updateDetailsVisible(true);
  };
  const onDetailsClose = () => {
    updateDetailsVisible(false);
  };

  return (
    <section
      className={`pt-25 pb-8 pl-4 ${constructorStyles["burger-constructor-section"]}`}
    >
      <ol
        className={`${constructorStyles["ingredients-list"]} ${
          enableOutline ? constructorStyles["drop-allowed"] : ""
        }`}
        ref={dropRef}
      >
        {(bunIngredient && (
          <ConstructorItem
            itemId={bunIngredient._id}
            key={`${bunIngredient._id}_top`}
            type="top"
            ingredient={bunIngredient}
            isLocked={true}
            text={`${bunIngredient.name} (верх)`}
            extraClass="mr-4 ml-8"
          />
        )) || (
          <div
            className={`${constructorStyles["top-bun"]} text text_type_main-medium text-center mr-4 ml-8`}
          >
            Выберите булку
          </div>
        )}

        <div
          className={`pr-4 ${constructorStyles["unlocked-ingredients-list"]}`}
        >
          {ingredients.length !== 0 ? (
            ingredients.map((item, index) => {
              const ingredient = ingredientsMap.get(item.ingredientId)!;

              return (
                <ConstructorItem
                  index={index}
                  itemId={item.id}
                  ingredient={ingredient}
                  key={item.id}
                  onDelete={() => onDeleteItem(item)}
                />
              );
            })
          ) : (
            <div
              className={`${constructorStyles["ingredient"]} text text_type_main-medium text-center ml-8`}
            >
              Выберите начинки
            </div>
          )}
        </div>
        {(bunIngredient && (
          <ConstructorItem
            key={`${bunIngredient._id}_bot`}
            itemId={bunIngredient._id}
            type="bottom"
            ingredient={bunIngredient}
            isLocked={true}
            text={`${bunIngredient.name} (низ)`}
            extraClass="mr-4 ml-8"
          />
        )) || (
          <div
            className={`${constructorStyles["bottom-bun"]} text text_type_main-medium text-center mr-4 ml-8`}
          >
            Выберите булку
          </div>
        )}
      </ol>

      <div className={`mr-4 ${constructorStyles["total-price-section"]}`}>
        <span className="text text_type_digits-medium">
          {totalPrice} <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          htmlType="button"
          size="large"
          disabled={bun === null}
          onClick={onClickCheckout}
        >
          Оформить заказ
        </Button>
        {detailsVisible && (
          <Modal onClose={onDetailsClose} title="">
            <OrderDetails />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
