import priceSpanStyles from "./price-span.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function PriceSpan({ price }: { price: number }) {
  return (
    <span className={`${priceSpanStyles.price} text text_type_digits-default`}>
      {price}
      <CurrencyIcon type="primary" />
    </span>
  );
}
