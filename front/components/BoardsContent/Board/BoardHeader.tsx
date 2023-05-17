import { FocusEvent, useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { motion } from "framer-motion";

import { BoardTypes } from "types/ContentDataStructure";

import { updateBoard } from "services/putApi";
import { dateFormater } from "utils/dateFormater";

import { ButtonIcon } from "components/atoms/ButtonIcon";

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
    <div className="flex h-[54px] items-center gap-2 bg-current-2 px-3 py-1 md:h-[64px] md:px-5">
      <motion.div
        className="w-full"
        style={{ maxWidth: "calc(100% - 48px)" }}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        {editTitle ? (
          <input
            className="w-48 rounded p-0.5 text-2xl text-black dark:text-white"
            ref={editTitleRef}
            defaultValue={boardTitle}
            onKeyDown={(e) => e.key === "Enter" && editTitleRef.current?.blur()}
            onBlur={(e) => {
              setEditTitle(false);
              handleChangeTitle(e);
            }}
            maxLength={255}
          />
        ) : (
          <button
            className="max-w-full truncate whitespace-nowrap p-0.5 text-2xl font-bold first-letter:uppercase"
            onClick={() => setEditTitle(true)}
          >
            {boardTitle}
          </button>
        )}
        <div className="flex items-center gap-0.5 pb-0.5 pl-0.5 text-sm">
          Utworzona: {dateFormater(boardData.createdAt)}
        </div>
      </motion.div>
      {!editTitle && (
        <ButtonIcon
          color="none"
          Icon={FiEdit}
          iconSize="iconSm"
          restClassNames="defaultHover"
          onClick={() => setEditTitle(true)}
        />
      )}
    </div>
  );
}
