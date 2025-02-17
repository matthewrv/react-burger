import { ChangeEvent, useCallback, useState } from "react";

export function useStringInput(): [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void
] {
  const [value, setValue] = useState("");
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );
  return [value, onChange];
}
