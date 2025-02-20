import { useRef, useState } from "react";
import { useStringInput } from "../../hooks";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export interface SafeInputProps {
  type: "text" | "email" | "password";
  placeholder: string;
  initialValue?: string;
  extraClass?: string;
}

export default function SafeInput({
  type,
  placeholder,
  initialValue,
  extraClass,
}: SafeInputProps) {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [value, onChangeValue, resetValue] = useStringInput(initialValue);

  const onIconClick = () => {
    setEnabled(!enabled);
    if (!enabled) {
      ref.current.focus();
      setTimeout(() => ref.current.focus(), 50);
    } else {
      ref.current.blur();
      resetValue();
    }
  };

  return (
    <Input
      ref={ref}
      type={type}
      value={value}
      onChange={onChangeValue}
      placeholder={placeholder}
      icon={enabled ? "CloseIcon" : "EditIcon"}
      disabled={!enabled}
      onIconClick={onIconClick}
      extraClass={extraClass}
    />
  );
}
