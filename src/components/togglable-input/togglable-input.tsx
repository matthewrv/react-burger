import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export interface ISafeInputProps {
  type: "text" | "email" | "password";
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  extraClass?: string;
}

const TogglableInput: FC<ISafeInputProps> = ({
  type,
  placeholder,
  extraClass,
  value,
  setValue,
}: ISafeInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [enabled, setEnabled] = useState(false);

  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const onIconClick = () => {
    setEnabled(!enabled);
    if (!enabled) {
      // small delay is required - disabled input can not get in focus
      setTimeout(() => ref.current?.focus(), 50);
    } else {
      ref.current?.blur();
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
};

export default TogglableInput;
