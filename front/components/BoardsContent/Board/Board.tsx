"use client";

import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { DummyData } from "data/DummyData";

import { BoardTypes, ColumnTypes } from "types/ContentDataStructure";

import { MapOrder } from "utils/MapOrder";

import Column from "../Column/Column";

export default function Board() {
  const [board, setBoard] = useState<BoardTypes>();
  const [columns, setColumns] = useState<ColumnTypes[]>([]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { destination, source } = result;
  };

  useEffect(() => {
    const boardData = DummyData.boards.find((item) => item.id === "board-1");
    if (boardData) {
      setBoard(boardData);
      setColumns(MapOrder(boardData.columns, boardData.columnsOrder));
    }
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="gradient-dir-1 relative flex h-full flex-col">
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
            <div className="relative mb-2 h-full">
              <div className="boardBodyScrollBar absolute inset-0 flex select-none snap-x snap-mandatory gap-2 overflow-x-auto overflow-y-hidden px-2 pb-2 md:snap-none">
                {columns &&
                  columns.map((column: ColumnTypes) => (
                    <Column column={column} key={column.id} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DragDropContext>
  );
}
