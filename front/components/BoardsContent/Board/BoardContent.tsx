import React, { useRef, useState } from "react";
import { Container, DropResult } from "react-smooth-dnd";

import { BoardTypes, ColumnTypes } from "types/ContentDataStructure";

import { useDragScroll } from "hooks/useDragScroll";
import { applyDrag } from "utils/applyDrag";
import { mapOrder } from "utils/mapOrder";

import { AddItem } from "components/BoardsContent/AddItem";

import Column from "../Column/Column";

export default function BoardContent({ boardData }: { boardData: BoardTypes }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [board, setBoard] = useState<BoardTypes>(boardData);
  const [columns, setColumns] = useState<ColumnTypes[]>(
    mapOrder(boardData.columns, boardData.columnsOrder)
  );
  const [allowDrag, setAllowDrag] = useState(true);
  const [stopScrollingX, setStopScrollingX] = useState(false);

  useDragScroll(scrollRef, stopScrollingX, allowDrag);

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

  const addItemFunction = (data: ColumnTypes) => {
    let newColumns = [...columns];
    newColumns.push(data);

    let newBoard = { ...board };
    newBoard.columnsOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  // const onUpdateColumn = (newColumnToUpdate:) => {
  //   console.log(newColumnToUpdate);
  // }

  return (
    <div
      className={`boardBodyScrollBar absolute inset-0 flex overflow-x-auto overflow-y-hidden px-1 pb-2 ${
        stopScrollingX
          ? `snap-none scroll-auto`
          : `snap-x snap-mandatory scroll-smooth md:snap-none md:scroll-auto`
      }`}
      ref={scrollRef}
    >
      <Container
        onDragStart={() => setStopScrollingX(true)}
        onDragEnd={() => setStopScrollingX(false)}
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
              key={column.id}
              column={column}
              onCardDrop={onCardDrop}
              setAllowDrag={setAllowDrag}
              board={board}
            />
          ))}
      </Container>
      <div className="column-wrapper">
        <div
          onMouseDown={() => setAllowDrag(false)}
          onMouseUp={() => setAllowDrag(true)}
          onMouseLeave={() => setAllowDrag(true)}
        >
          <AddItem
            title="Dodaj kolejną listę"
            placeholder="Wpisz tytuł listy"
            isBoard
            board={board}
            addItemFunction={addItemFunction}
          />
        </div>
      </div>
    </div>
  );
}
