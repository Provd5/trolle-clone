import { Dispatch, SetStateAction, useRef } from "react";
import { Container, Draggable, DropResult } from "react-smooth-dnd";

import { ColumnTypes } from "types/ContentDataStructure";

import { mapOrder } from "utils/mapOrder";

import Card from "../Card/Card";

export default function Column({
  column,
  onCardDrop,
  setStopScrolling,
}: {
  column: ColumnTypes;
  onCardDrop: (columnId: ColumnTypes["id"], result: DropResult) => void;
  setStopScrolling: Dispatch<SetStateAction<boolean>>;
}) {
  const cards = mapOrder(column.cards, column.cardsOrder);
  const scrollRefChild = useRef(null);

  return (
    <Draggable>
      <div className="mx-1 inline-block h-full">
        <div
          className="flex max-h-full w-64 flex-none flex-col rounded bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white"
          ref={scrollRefChild}
        >
          <div className="column-header column-drag-handle flex w-full cursor-grab p-1 font-bold">
            <div className="w-full rounded-md p-2">
              <h1>{column.title}</h1>
            </div>
          </div>
          <div className="column-body columnBodyScrollBar mx-1 min-h-[30px] flex-1 overflow-y-auto overflow-x-hidden px-1">
            <Container
              onDragStart={() => {
                setStopScrolling(true);
              }}
              onDragEnd={() => {
                setStopScrolling(false);
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
          <div className="column-footer flex w-full p-1">
            <div className="w-full cursor-pointer rounded-md p-2 hover:bg-neutral-400/40 hover:dark:bg-neutral-900/60 ">
              + dodaj czy coś
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
