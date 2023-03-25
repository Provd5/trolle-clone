import { Dispatch, RefObject, SetStateAction } from "react";

export function useClickOutside(
  ref: RefObject<HTMLDivElement>,
  setState: Dispatch<SetStateAction<boolean>>
) {
  const el = ref.current;

  function handleClickOutside(event: MouseEvent | TouchEvent): void {
    el && !el.contains(event.target as Node) && setState(false);
  }

  function handleEscKey(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      setState(false);
    }
  }

  document.addEventListener("touchstart", handleClickOutside);
  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown", handleEscKey);
  return () => {
    document.removeEventListener("touchstart", handleClickOutside);
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleEscKey);
  };
}
