"use client";

import { useEffect, useState } from "react";
import { DummyData } from "data/DummyData";

import { BoardTypes } from "types/ContentDataStructure";

import BoardContent from "./BoardContent";

export default function Board() {
  const [boardData, setBoardData] = useState<BoardTypes>();

  useEffect(() => {
    const boardData = DummyData.boards.find((board) => board.id === "board-1");
    setBoardData(boardData);
  }, []);

  return (
    <div className="gradient-dir-1 relative flex h-full flex-col">
      {!boardData ? (
        <div className="flex w-full items-center justify-center p-5">
          Ładowanie tablicy...
        </div>
      ) : (
        <>
          <div className="flex min-h-[40px] items-center justify-between py-3 px-4">
            <div>Board title</div>
            <div>jakas ikona</div>
          </div>
          <div className="relative mb-2 h-full select-none">
            <BoardContent boardData={boardData} />
          </div>
        </>
      )}
    </div>
  );
}
