import { ChangeEvent, useCallback, useState } from "react";

export function useStringInput(
  initialValue?: string
): [string, (e: ChangeEvent<HTMLInputElement>) => void, () => void] {
  const [value, setValue] = useState(initialValue || "");

  const resetValue = useCallback(() => {
    setValue(initialValue || "");
  }, [initialValue, setValue]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  return [value, onChange, resetValue];
}
