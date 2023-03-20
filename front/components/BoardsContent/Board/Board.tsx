"use client";

import { useEffect, useState } from "react";
import { Container, DropResult } from "react-smooth-dnd";
import { DummyData } from "data/DummyData";

import { BoardTypes, ColumnTypes } from "types/ContentDataStructure";

import { applyDrag } from "utils/applyDrag";
import { mapOrder } from "utils/mapOrder";

import Column from "../Column/Column";

export default function Board() {
  const [board, setBoard] = useState<BoardTypes>();
  const [columns, setColumns] = useState<ColumnTypes[]>([]);

  useEffect(() => {
    const boardData = DummyData.boards.find((board) => board.id === "board-1");
    if (boardData) {
      setBoard(boardData);
      setColumns(mapOrder(boardData.columns, boardData.columnsOrder));
    }
  }, []);

  const onColumnDrop = (result: DropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, result);

    if (board) {
      let newBoard = { ...board };
      newBoard.columnsOrder = newColumns.map((column) => column.id);
      newBoard.columns = newColumns;

      setColumns(newColumns);
      setBoard(newBoard);
    }
  };

  const onCardDrop = (columnId: ColumnTypes["id"], result: DropResult) => {
    if (result.addedIndex !== null || result.removedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((column) => column.id === columnId);

      if (currentColumn) {
        currentColumn.cards = applyDrag(currentColumn.cards, result);
        currentColumn.cardsOrder = currentColumn.cards.map((card) => card.id);

        setColumns(newColumns);
      }
    }
  };

  return (
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
          <div className="relative mb-2 h-full select-none">
            <div className="boardBodyScrollBar absolute inset-0 flex overflow-x-auto overflow-y-hidden px-1 pb-2">
              <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                dragHandleSelector=".column-drag-handle"
                dragClass="card-ghost"
                dropClass="card-ghost-drop"
                dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: "drop-preview",
                }}
                getChildPayload={(index) => columns[index]}
              >
                {columns &&
                  columns.map((column: ColumnTypes) => (
                    <Column
                      column={column}
                      key={column.id}
                      onCardDrop={onCardDrop}
                    />
                  ))}
              </Container>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
