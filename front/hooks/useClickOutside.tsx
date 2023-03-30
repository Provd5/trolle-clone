import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";

export function useClickOutside(
  ref: RefObject<any>,
  toggle: Dispatch<SetStateAction<boolean>> | ((arg: any) => void),
  value: any,
  enterKey?: boolean
) {
  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent | KeyboardEvent): void => {
      if (
        event instanceof KeyboardEvent &&
        (event.key === "Escape" ||
          (enterKey && event.key === "Enter" && !event.shiftKey))
      ) {
        toggle(value);
      }

      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggle(value);
      }
    },
    [ref, toggle, value, enterKey]
  );

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent | TouchEvent) => {
      handleClickOutside(event);
    };

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      handleClickOutside(event);
    };

    document.addEventListener("mousedown", handleDocumentClick, true);
    document.addEventListener("touchstart", handleDocumentClick, true);
    document.addEventListener("keydown", handleDocumentKeyDown, true);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick, true);
      document.removeEventListener("touchstart", handleDocumentClick, true);
      document.removeEventListener("keydown", handleDocumentKeyDown, true);
    };
  }, [handleClickOutside]);
}
