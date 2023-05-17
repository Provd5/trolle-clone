import React, { useEffect, useRef, useState } from "react";
import { Container, DropResult } from "react-smooth-dnd";
import { AnimatePresence, motion } from "framer-motion";

import { BoardTypes, CardTypes, ColumnTypes } from "types/ContentDataStructure";

import { useDragScroll } from "hooks/useDragScroll";
import { postNewColumn } from "services/postApi";
import { updateBoard, updateCard, updateColumn } from "services/putApi";
import { applyDrag } from "utils/applyDrag";
import { mapOrder } from "utils/mapOrder";

import { Loader } from "components/atoms/Loader";
import { AddItem } from "components/BoardsContent/AddItem";

import Column from "../Column/Column";

export default function BoardContent({ boardData }: { boardData: BoardTypes }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [board, setBoard] = useState<BoardTypes>();
  const [columns, setColumns] = useState<ColumnTypes[]>();
  const [allowDrag, setAllowDrag] = useState(true);
  const [stopScrollingX, setStopScrollingX] = useState(false);

  useDragScroll(scrollRef, stopScrollingX, allowDrag);

  useEffect(() => {
    setBoard(boardData),
      boardData.columnsOrder
        ? setColumns(mapOrder(boardData.columns, boardData.columnsOrder))
        : setColumns(boardData.columns);
  }, [boardData]);

  function newBoard(newColumns: ColumnTypes[]) {
    if (!board) return;

    let newBoard = { ...board };
    newBoard.columnsOrder = newColumns.map((column) => column._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  }

  const onColumnDrop = (result: DropResult) => {
    if (
      !board ||
      !columns ||
      result.addedIndex === null ||
      result.removedIndex === null ||
      result.removedIndex === result.addedIndex
    )
      return;

    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, result);

    let newBoard = { ...board };
    newBoard.columnsOrder = newColumns.map((column) => column._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
    updateBoard(newBoard._id, { columnsOrder: newBoard.columnsOrder }).catch(
      () => {
        setColumns(columns);
        setBoard(board);
      }
    );
  };

  const onCardDrop = (column_Id: ColumnTypes["_id"], result: DropResult) => {
    if (!columns || result.removedIndex === result.addedIndex) return;

    if (result.addedIndex !== null || result.removedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((column) => column._id === column_Id);

      if (currentColumn) {
        currentColumn.cards = applyDrag(currentColumn.cards, result);
        currentColumn.cardsOrder = currentColumn.cards.map((card) => card._id);

        setColumns(newColumns);

        if (result.removedIndex !== null && result.addedIndex !== null) {
          // moving cards inside column
          updateColumn(currentColumn._id, currentColumn).catch(() => {
            setColumns(columns);
          });
        } else {
          // moving cards between columns
          if (result.addedIndex !== null) {
            let currentCard: CardTypes = { ...result.payload };
            currentCard.columnId = currentColumn._id;

            updateCard(currentCard._id, currentCard);
          }
        }
      }
    }
  };

  const addItemFunction = (data: ColumnTypes) => {
    if (!board || !columns) return;

    postNewColumn(data).then((result) => {
      const insertedId = result.insertedId;

      let newColumns = [...columns];
      newColumns.push({ ...data, cards: [], _id: insertedId });

      let newBoard = { ...board };
      newBoard.columnsOrder = newColumns.map((column) => column._id);
      newBoard.columns = newColumns;

      setColumns(newColumns);
      setBoard(newBoard);
    });
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
    <motion.div
      transition={{ bounce: 0 }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`boardBodyScrollBar absolute inset-0 flex overflow-x-auto overflow-y-hidden px-3 pb-2 ${
        stopScrollingX
          ? `snap-none scroll-auto`
          : `snap-x snap-mandatory scroll-smooth md:snap-none md:scroll-auto`
      }`}
      ref={scrollRef}
    >
      {board && columns ? (
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
            <AnimatePresence>
              {columns &&
                columns.map((column: ColumnTypes) => (
                  <Column
                    key={column._id}
                    board={board}
                    column={column}
                    setAllowDrag={setAllowDrag}
                    onUpdateColumn={onUpdateColumn}
                    onCardDrop={onCardDrop}
                  />
                ))}
            </AnimatePresence>
          </Container>
          <div className="column-wrapper">
            <div
              onMouseDown={() => setAllowDrag(false)}
              onMouseUp={() => setAllowDrag(true)}
              onMouseLeave={() => setAllowDrag(true)}
            >
              <AddItem
                title="Dodaj nową listę"
                placeholder="Wpisz tytuł listy"
                board={board}
                addItemFunction={addItemFunction}
              />
            </div>
          </div>
        </>
      ) : (
        <Loader loadingText="Ładowanie kolumn..." />
      )}
    </motion.div>
  );
}
