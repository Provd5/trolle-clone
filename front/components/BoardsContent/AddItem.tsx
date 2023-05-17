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

import { Button } from "components/atoms/Button";
import { ButtonIcon } from "components/atoms/ButtonIcon";

export function AddItem({
  title,
  placeholder,
  board,
  column,
  addItemFunction,
}: {
  title: string;
  placeholder: string;
  isColumn?: boolean;
  board: BoardTypes;
  column?: ColumnTypes;
  addItemFunction?: (data: any) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [toggleInput, setToggleInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useClickOutside(wrapperRef, setToggleInput, false);
  useDragScroll(textareaRef as unknown as RefObject<HTMLDivElement>);

  useEffect(() => {
    const el = textareaRef.current;
    if (el && toggleInput) {
      el.focus();
      el.select();
      adjustHeight(textareaRef);
    }
  }, [toggleInput]);

  const onNewTitleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNewTitle(e.target.value);
    },
    []
  );

  const addNewItem = () => {
    if (!(newTitle.trim().length > 0)) {
      textareaRef.current?.focus();
      return;
    }

    const itemToAdd = {
      boardId: board._id,
      title: newTitle.trim(),
      ...(column && { columnId: column?._id }),
    };

    addItemFunction?.(itemToAdd);
    setNewTitle("");
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.focus();
      adjustHeight(textareaRef);
    }
    if (!column) setToggleInput(false);
  };

  return (
    <div
      className={`max-h-full rounded ${
        !column
          ? `w-64 bg-neutral-200/30 p-1 dark:bg-neutral-800/40 ${
              !toggleInput &&
              `hover:bg-neutral-200/40
          hover:dark:bg-neutral-900/50`
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
          <textarea
            className="max-h-[160px] resize-none rounded p-2 text-black dark:text-white"
            placeholder={placeholder}
            ref={textareaRef}
            defaultValue={newTitle}
            onChange={(e) => {
              adjustHeight(textareaRef);
              onNewTitleChange(e);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addNewItem();
              }
            }}
            maxLength={255}
          />
          <div className="mt-2 flex items-center gap-2 md:gap-1">
            <Button color="defaultColor" onClick={addNewItem}>
              Dodaj
            </Button>
            <ButtonIcon
              color="none"
              restClassNames="defaultHover"
              onClick={() => setToggleInput(false)}
              Icon={RxCross1}
              iconSize="iconSm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
