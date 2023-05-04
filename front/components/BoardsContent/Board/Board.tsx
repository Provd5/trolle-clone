"use client";

import { useEffect, useState } from "react";
import { DummyData } from "data/DummyData";

import { BoardTypes } from "types/ContentDataStructure";

import BoardContent from "./BoardContent";

export default function Board(boardData: BoardTypes) {
  const [board, setBoard] = useState<BoardTypes>();

  useEffect(() => {
    const board = boardData
      ? boardData
      : DummyData.boards.find((board) => board._id === "board-1");
    setBoard(board);
  }, [boardData]);

  return (
    <div className="gradient-dir-1 relative flex h-full flex-col">
      {!board ? (
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
      )}
    </div>
  );
}
