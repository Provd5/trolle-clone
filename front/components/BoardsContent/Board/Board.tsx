"use client";

import { useEffect, useState } from "react";

import { BoardTypes } from "types/ContentDataStructure";

import BoardContent from "./BoardContent";

export default function Board({ boardData }: { boardData: BoardTypes }) {
  const [board, setBoard] = useState<BoardTypes>();

  useEffect(() => {
    const board = boardData;
    setBoard(board);
  }, [boardData]);

  return !board ? (
    <div className="flex w-full items-center justify-center p-5">
      Ładowanie tablicy...
    </div>
  ) : (
    <>
      <div className="flex min-h-[40px] items-center justify-between px-4 py-3">
        <div>Board title</div>
        <div>jakas ikona</div>
      </div>
      <div className="relative mb-2 h-full select-none">
        <BoardContent boardData={board} />
      </div>
    </>
  );
}
