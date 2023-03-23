import { RefObject, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

export function AddItem({
  placeholder,
  title,
  textarea = false,
  secondary = false,
}: {
  title: string;
  placeholder: string;
  textarea?: boolean;
  secondary?: boolean;
}) {
  const [toggleInput, setToggleInput] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;

    function handleClickOutside(event: MouseEvent | TouchEvent): void {
      el && !el.contains(event.target as Node) && setToggleInput(false);
    }

    function handleEscKey(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setToggleInput(false);
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
  });

  function AdjustHeight(ref: RefObject<HTMLElement>) {
    if (!ref.current) return;
    ref.current.scrollHeight > 160
      ? ((ref.current.style.overflowY = "scroll"),
        (ref.current.style.paddingRight = "0px"))
      : ((ref.current.style.overflowY = "hidden"),
        (ref.current.style.paddingRight = "15px"));
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }

  return (
    <div
      className={`max-h-full rounded ${
        secondary
          ? `w-64 bg-neutral-200/30 p-1 dark:bg-neutral-800/40 ${
              !toggleInput &&
              `hover:bg-neutral-200/40
          hover:dark:bg-neutral-800/60`
            }`
          : `m-1 w-full ${
              !toggleInput &&
              `hover:bg-neutral-400/20 hover:dark:bg-neutral-900/50`
            }`
      }`}
    >
      {!toggleInput ? (
        <button
          className="flex w-full items-center gap-1 rounded p-2"
          onClick={() => {
            setToggleInput(true);
            () => inputRef.current?.focus();
            () => textareaRef.current?.focus();
          }}
        >
          <AiOutlinePlus className="h-5 w-5" />
          <span>{title}</span>
        </button>
      ) : (
        <div className="flex w-full flex-col p-1.5" ref={wrapperRef}>
          {textarea ? (
            <textarea
              className="max-h-[160px] resize-none rounded p-2 text-black dark:text-white"
              placeholder={placeholder}
              onChange={() => AdjustHeight(textareaRef)}
              ref={textareaRef}
            />
          ) : (
            <input
              className="rounded p-2.5 text-black dark:text-white"
              placeholder={placeholder}
              ref={inputRef}
            />
          )}
          <div className="mt-1.5 flex items-center gap-2 md:gap-1">
            <button className="btn-default bg-[var(--current-1)] text-white hover:bg-[var(--current-2)]">
              Dodaj
            </button>
            <button
              className="btn-icon"
              onClick={() => {
                setToggleInput(false);
              }}
            >
              <RxCross1 className="icon-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
