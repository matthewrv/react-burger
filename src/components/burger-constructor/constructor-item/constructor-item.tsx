import constructorItemStyles from "./constructor-item.module.css";
import { BurgerIngredient } from "../../../services/common";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { AppDispatch } from "../../../services/store";
import { useDispatch } from "react-redux";
import { swapElements } from "../../../services/selected-ingredients";
import { useMemo, useRef, useState } from "react";

export interface ConsturtorItemProps {
  itemId: string;
  ingredient: BurgerIngredient;
  index?: number;
  isLocked?: boolean;
  text?: string;
  type?: "top" | "bottom";
  extraClass?: string;
  onDelete?: () => void;
}

export default function ConstructorItem(props: ConsturtorItemProps) {
  const dispatch: AppDispatch = useDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const [, dragRef] = useDrag({
    type: "editable-item",
    item: { index: props.index },
  });

  const [{ slideDown }, dropRef] = useDrop({
    accept: "editable-item",
    drop(item) {
      dispatch(
        swapElements({ dragIndex: item.index, hoverIndex: props.index })
      );
    },
    collect: (monitor) => ({
      slideDown: !(typeof props.index === "undefined") && monitor.isOver(),
    }),
  });

  dropRef(dragRef(ref));
  const liStyle = slideDown ? constructorItemStyles["slide-down"] : "";

  return (
    <li
      className={`${constructorItemStyles["ingredients-list-item"]} ${liStyle}`}
      ref={ref}
    >
      {!props.isLocked && <DragIcon type="primary" />}
      <ConstructorElement
        type={props.type}
        text={props.text || props.ingredient.name}
        price={props.ingredient.price}
        thumbnail={props.ingredient.image}
        handleClose={props.onDelete}
        extraClass={props.extraClass}
        isLocked={props.isLocked}
      />
    </li>
  );
}
