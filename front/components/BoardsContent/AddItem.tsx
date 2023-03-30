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

import { useClickOutside } from "hooks/useClickOutside";
import { useDragScroll } from "hooks/useDragScroll";
import { adjustHeight } from "utils/adjustHeight";

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [toggleInput, setToggleInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [textareaHeight, setTextareaHeight] = useState<string>();

  useClickOutside(wrapperRef, setToggleInput, false);
  useDragScroll(textareaRef as unknown as RefObject<HTMLDivElement>);

  useEffect(() => {
    const el = textareaRef.current || inputRef.current;
    if (el && toggleInput) {
      el.focus();
      el.select();
    }
  }, [toggleInput]);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight(textareaRef);
      setTextareaHeight(textareaRef.current.style.height);
    }
  }, [textareaHeight, toggleInput]);

  const onNewTitleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNewTitle(e.target.value);
    },
    []
  );

  const addNewItem = () => {
    if (!newTitle) {
      (isBoard ? inputRef.current : textareaRef.current)?.focus();
      return;
    }

    const titleToAdd = {
      id: Math.random().toString(36).substring(2, 5), // do zmiany gdy bedziemy mieli database
      boardId: board.id,
      title: newTitle.trim(),
      ...(column
        ? { columnId: column.id, desc: "" }
        : { cardsOrder: [], cards: [] }),
    };

    addItemFunction?.(titleToAdd);
    setNewTitle("");
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.focus();
      adjustHeight(textareaRef);
      setTextareaHeight(textareaRef.current.style.height);
    }
    if (inputRef.current) setToggleInput(false);
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
                setTextareaHeight(e.target.style.height);
                adjustHeight(textareaRef);
                onNewTitleChange(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNewItem();
                }
              }}
            />
          )}
          <div className="mt-2 flex items-center gap-2 md:gap-1">
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
