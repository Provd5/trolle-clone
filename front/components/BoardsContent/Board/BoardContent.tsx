"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container, DropResult } from "react-smooth-dnd";

import { BoardTypes, ColumnTypes } from "types/ContentDataStructure";

import { useDragScroll } from "hooks/useDragScroll";
import { postNewColumn } from "services/postApi";
import { applyDrag } from "utils/applyDrag";
import { mapOrder } from "utils/mapOrder";

import { AddItem } from "components/BoardsContent/AddItem";

import Column from "../Column/Column";

export default function BoardContent({ boardData }: { boardData: BoardTypes }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [board, setBoard] = useState<BoardTypes>();
  const [columns, setColumns] = useState<ColumnTypes[]>();
  const [loadedData, setLoadedData] = useState(false);
  const [allowDrag, setAllowDrag] = useState(true);
  const [stopScrollingX, setStopScrollingX] = useState(false);

  useDragScroll(scrollRef, stopScrollingX, allowDrag);

  useEffect(() => {
    setLoadedData(false);
  }, [boardData]);

  useEffect(() => {
    !loadedData &&
      boardData &&
      (setBoard(boardData),
      boardData.columnsOrder
        ? setColumns(mapOrder(boardData.columns, boardData.columnsOrder))
        : setColumns(boardData.columns),
      setLoadedData(true));
  }, [boardData, loadedData]);

  function newBoard(newColumns: ColumnTypes[]) {
    if (!board) return;

    let newBoard = { ...board };
    newBoard.columnsOrder = newColumns.map((column) => column._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  }

  const onColumnDrop = (result: DropResult) => {
    if (!columns) return;

    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, result);

    setColumns(newColumns);
  };

  const onCardDrop = (column_Id: ColumnTypes["_id"], result: DropResult) => {
    if (!columns) return;

    if (result.addedIndex !== null || result.removedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((column) => column._id === column_Id);

      if (currentColumn) {
        currentColumn.cards = applyDrag(currentColumn.cards, result);
        currentColumn.cardsOrder = currentColumn.cards.map((card) => card._id);

        setColumns(newColumns);
      }
    }
  };

  const addItemFunction = (data: ColumnTypes) => {
    if (!board || !columns) return;

    postNewColumn(data);
    let newColumns = [...columns];
    newColumns.push(data);

    let newBoard = { ...board };
    newBoard.columnsOrder = newColumns.map((column) => column._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onUpdateColumn = (
    newColumnToUpdate: ColumnTypes & { _destroy?: boolean }
  ) => {
    if (!columns) return;

    let newColumns = [...columns];
    const columnIndexToUpdate = newColumns.findIndex(
      (index) => index._id === newColumnToUpdate._id
    );

    newColumnToUpdate._destroy
      ? newColumns.splice(columnIndexToUpdate, 1)
      : newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);

    newBoard(newColumns);
  };

  return (
    <div
      className={`boardBodyScrollBar overflow-y-h_idden absolute inset-0 flex overflow-x-auto px-1 pb-2 ${
        stopScrollingX
          ? `snap-none scroll-auto`
          : `snap-x snap-mandatory scroll-smooth md:snap-none md:scroll-auto`
      }`}
      ref={scrollRef}
    >
      {loadedData && board && columns ? (
        <>
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
                  key={column._id}
                  column={column}
                  onCardDrop={onCardDrop}
                  setAllowDrag={setAllowDrag}
                  board={board}
                  onUpdateColumn={onUpdateColumn}
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
                isColumn
                board={board}
                addItemFunction={addItemFunction}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center p-5">
          ⌛ Ładowanie kolumn...
        </div>
      )}
    </div>
  );
}
