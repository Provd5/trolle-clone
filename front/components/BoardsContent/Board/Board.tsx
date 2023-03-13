"use client";

import { useEffect, useState } from "react";
import { DummyData } from "data/DummyData";

import { BoardTypes, ColumnTypes } from "types/ContentDataStructure";

import { MapOrder } from "utils/MapOrder";

import Column from "../Column/Column";

export default function Board() {
  const [board, setBoard] = useState<BoardTypes>();
  const [columns, setColumns] = useState<ColumnTypes[]>([]);

  useEffect(() => {
    const boardData = DummyData.boards.find((item) => item.id === "board-1");
    if (boardData) {
      setBoard(boardData);
      setColumns(MapOrder(boardData.columns, boardData.columnsOrder));
    }
  }, []);

  return (
    <div className="bg-gradient-t relative flex h-full flex-col">
      {!board ? (
        <div className="flex w-full items-center justify-center p-5">
          Ładowanie tablicy...
        </div>
      ) : (
        <>
          <div className="flex min-h-[40px] items-center justify-between py-3 px-4">
            <div>Board title</div>
            <div>jakas ikona</div>
          </div>
          <div className="boardBodyScrollBar relative mb-2 h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden md:snap-none">
            <div className="absolute inset-0 flex">
              <div className="flex gap-2 px-2 pb-2">
                {columns &&
                  columns.map((column: ColumnTypes) => (
                    <Column column={column} key={column.id} />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
