import { FocusEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { BoardTypes } from "types/ContentDataStructure";

import { updateBoard } from "services/putApi";
import { dateFormater } from "utils/dateFormater";

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
        updateBoard(boardData._id, {
          ...boardData,
          title: e.target.value,
        }).then(() => setBoardTitle(e.target.value));
    }
  };

  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
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
          className="whitespace-nowrap text-2xl font-bold first-letter:uppercase"
          onClick={() => setEditTitle(true)}
        >
          {boardTitle}
        </button>
      )}
      <div className="flex items-center gap-0.5 text-sm">
        Utworzona: {dateFormater(boardData.createdAt)}
      </div>
    </motion.div>
  );
}
