import { Dispatch, RefObject, SetStateAction } from "react";

export function clickOutside(
  ref: RefObject<HTMLDivElement>,
  toggle: Dispatch<SetStateAction<boolean>> | ((arg: any) => void),
  value: any
) {
  function handleClickOutside(event: MouseEvent | TouchEvent): void {
    const el = ref.current;
    el && !el.contains(event.target as Node) && toggle(value);
  }

  function handleEscKey(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      toggle(value);
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
