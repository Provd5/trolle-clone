import { FocusEvent, useEffect, useRef, useState } from "react";

import { BoardTypes } from "types/ContentDataStructure";

import { updateBoard } from "services/putApi";
import { dataFormater } from "utils/dataFormater";

export default function BoardHeader({ boardData }: { boardData: BoardTypes }) {
  const editTitleRef = useRef<HTMLInputElement>(null);

  const [editTitle, setEditTitle] = useState(false);
  const [boardTitle, setBoardTitle] = useState<string>(boardData.title);

  useEffect(() => {
    if (editTitle) {
      editTitleRef.current?.focus();
      editTitleRef.current?.select();
    }
  }, [editTitle]);

  const handleChangeTitle = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== boardTitle) {
      e.target.value.trim().length > 0 &&
        (updateBoard(boardData._id, { ...boardData, title: e.target.value }),
        setBoardTitle(e.target.value));
    }
  };

  return (
    <div>
      {editTitle ? (
        <input
          className="w-40 text-2xl text-black dark:text-white"
          ref={editTitleRef}
          defaultValue={boardTitle}
          onKeyDown={(e) => e.key === "Enter" && editTitleRef.current?.blur()}
          onBlur={(e) => {
            setEditTitle(false);
            handleChangeTitle(e);
          }}
        ></input>
      ) : (
        <button
          className="text-2xl font-bold first-letter:uppercase"
          onClick={() => setEditTitle(true)}
        >
          {boardTitle}
        </button>
      )}
      <div className="flex items-center gap-0.5 text-sm">
        Utworzona: {dataFormater(boardData.createdAt)}
      </div>
    </div>
  );
}
