import { TOrderItem } from "./models";

export function isValidOrder(
  order: unknown,
  validIngridientIds: Set<string>
): order is TOrderItem {
  return (
    typeof order === "object" &&
    order !== null &&
    "_id" in order &&
    typeof order._id === "string" &&
    "number" in order &&
    typeof order.number === "number" &&
    "ingredients" in order &&
    Array.isArray(order.ingredients) &&
    validIngiridients(order.ingredients, validIngridientIds)
  );
}

function validIngiridients(
  orderIngridientsIds: ReadonlyArray<unknown>,
  validIngiridientsIds: Set<string>
): boolean {
  for (const ingridientId of orderIngridientsIds) {
    if (
      typeof ingridientId !== "string" ||
      !validIngiridientsIds.has(ingridientId)
    ) {
      return false;
    }
  }
  return true;
}
