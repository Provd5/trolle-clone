import {
  ChangeEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import { BoardTypes, ColumnTypes } from "types/ContentDataStructure";

import { clickOutside } from "utils/clickOutside";

export function AddItem({
  title,
  placeholder,
  isBoard = false,
  board,
  column,
  addItemFunction,
}: {
  title: string;
  placeholder: string;
  isBoard?: boolean;
  board: BoardTypes;
  column?: ColumnTypes;
  addItemFunction?: (data: any) => void;
}) {
  const [toggleInput, setToggleInput] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [toggleInput]);

  useEffect(() => {
    clickOutside(wrapperRef, setToggleInput, false);
  }, []);

  function AdjustHeight(ref: RefObject<HTMLTextAreaElement>) {
    if (!ref.current) return;
    ref.current.scrollHeight > 160
      ? ((ref.current.style.overflowY = "scroll"),
        (ref.current.style.paddingRight = "0px"))
      : ((ref.current.style.overflowY = "hidden"),
        (ref.current.style.paddingRight = "15px"));
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }

  const [newTitle, setNewTitle] = useState("");
  const onNewTitleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setNewTitle(e.target.value),
    []
  );
  const addNewItem = () => {
    if (!newTitle) {
      !isBoard ? textareaRef.current?.focus() : inputRef.current?.focus();
      return;
    }

    const titleToAdd = {
      id: Math.random().toString(36).substring(2, 5), // do zmiany gdy bedziemy mieli database
      boardId: board.id,
      title: newTitle.trim(),
      ...(!column
        ? { cardsOrder: [], cards: [] }
        : { columnId: column.id, desc: "" }),
    };
    console.log(titleToAdd);

    addItemFunction && addItemFunction(titleToAdd);
    setNewTitle("");
    setToggleInput(false);
  };

  return (
    <div
      className={`max-h-full rounded ${
        isBoard
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
          }}
        >
          <AiOutlinePlus className="h-5 w-5" />
          <span>{title}</span>
        </button>
      ) : (
        <div className="flex w-full flex-col p-1.5" ref={wrapperRef}>
          {!isBoard ? (
            <textarea
              className="max-h-[160px] resize-none rounded p-2 text-black dark:text-white"
              placeholder={placeholder}
              ref={textareaRef}
              defaultValue={newTitle}
              onChange={(e) => {
                AdjustHeight(textareaRef);
                onNewTitleChange(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNewItem();
                }
              }}
            />
          ) : (
            <input
              className="rounded p-2.5 text-black dark:text-white"
              placeholder={placeholder}
              ref={inputRef}
              value={newTitle}
              onChange={(e) => onNewTitleChange(e)}
              onKeyDown={(e) => e.key === "Enter" && addNewItem()}
            />
          )}
          <div className="mt-1.5 flex items-center gap-2 md:gap-1">
            <button
              className="btn-default bg-[var(--current-1)] text-white hover:bg-[var(--current-2)]"
              onClick={addNewItem}
            >
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
