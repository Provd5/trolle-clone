"use client";

import { useEffect, useState } from "react";
import { DummyData } from "data/DummyData";

import { BoardTypes, ColumnTypes } from "types/ContentDataStructure";

import Column from "../Column/Column";

export default function Board() {
  const [board, setBoard] = useState<BoardTypes>();
  const [columns, setColumns] = useState<ColumnTypes[]>([]);

  useEffect(() => {
    const boardData = DummyData.boards.find((item) => item.id === "board-1");
    if (boardData) {
      setBoard(boardData);
      setColumns(boardData.columns);
    }
  }, []);

  return (
    <div className="relative flex h-full flex-col">
      {!board ? (
        <div>Brak tablic</div>
      ) : (
        <>
          <div className="flex items-center justify-between p-3">
            <div>Board title</div>
            <div>jakas ikona</div>
          </div>
          <div className="relative h-full overflow-x-auto overflow-y-hidden">
            <div className="absolute inset-0 m-2 flex gap-3">
              {columns &&
                columns.map((column: ColumnTypes) => (
                  <Column column={column} key={column.id} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
