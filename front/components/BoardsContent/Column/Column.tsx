import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Container, Draggable, DropResult } from "react-smooth-dnd";

import { BoardTypes, CardTypes, ColumnTypes } from "types/ContentDataStructure";

import { useDragScroll } from "hooks/useDragScroll";
import { clickOutside } from "utils/clickOutside";
import { mapOrder } from "utils/mapOrder";

import { AddItem } from "components/BoardsContent/AddItem";

import Card from "../Card/Card";
import MoreOptionsModal from "./MoreOptionsModal";

export default function Column({
  column,
  onCardDrop,
  setAllowDrag,
  board,
}: {
  column: ColumnTypes;
  onCardDrop: (columnId: ColumnTypes["id"], result: DropResult) => void;
  setAllowDrag: Dispatch<SetStateAction<boolean>>;
  board: BoardTypes;
}) {
  const [moreOptionsModal, setMoreOptionsModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    clickOutside(modalRef, setMoreOptionsModal, false);
  }, []);

  const [thisColumn, setThisColumn] = useState(column);
  const cards = mapOrder(column.cards, column.cardsOrder);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [stopScrollingY, setStopScrollingY] = useState(false);
  useDragScroll(scrollRef, stopScrollingY);

  const addItemFunction = (data: CardTypes) => {
    let newColumn = { ...thisColumn };
    newColumn.cards.push(data);
    newColumn.cardsOrder.push(data.id);

    setThisColumn(newColumn);
  };

  return (
    <Draggable>
      <div className="column-wrapper">
        <div
          className="relative flex max-h-full w-72 flex-col rounded bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white"
          onMouseDown={() => {
            setAllowDrag(false);
          }}
          onMouseUp={() => {
            setAllowDrag(true);
          }}
          onMouseLeave={() => {
            setAllowDrag(true);
          }}
        >
          <div className="column-header flex items-center p-1">
            <div className="column-drag-handle w-full cursor-grab rounded-md p-2">
              <h1 className="font-bold">{column.title}</h1>
            </div>
            <button
              className="btn-icon"
              onClick={() => setMoreOptionsModal(true)}
            >
              <BiDotsHorizontalRounded className="icon" />
            </button>
            {moreOptionsModal && <MoreOptionsModal modalRef={modalRef} />}
          </div>
          <div
            className="column-body columnBodyScrollBar mx-1 overflow-y-auto overflow-x-hidden px-1"
            ref={scrollRef}
          >
            <Container
              onDragStart={() => {
                setStopScrollingY(true);
              }}
              onDragEnd={() => {
                setStopScrollingY(false);
              }}
              onDrop={(result) => onCardDrop(column.id, result)}
              groupName="column-body"
              getChildPayload={(index) => cards[index]}
              dragClass="card-ghost"
              dropClass="card-ghost-drop"
              dropPlaceholder={{
                animationDuration: 150,
                showOnTop: true,
                className: "drop-preview",
              }}
            >
              {cards && cards.map((card) => <Card card={card} key={card.id} />)}
            </Container>
          </div>
          <div className="column-footer flex w-full">
            <AddItem
              title="Dodaj kartę"
              placeholder="Wpisz tytuł karty..."
              board={board}
              column={column}
              addItemFunction={addItemFunction}
            />
          </div>
        </div>
      </div>
    </Draggable>
  );
}
