import { Droppable } from "react-beautiful-dnd";

import { ColumnTypes } from "types/ContentDataStructure";

import { MapOrder } from "utils/MapOrder";

import Card from "../Card/Card";

export default function Column({ column }: { column: ColumnTypes }) {
  const cards = MapOrder(column.cards, column.cardsOrder);

  return (
    <Droppable droppableId={column.id.toString()}>
      {(provided, snapshot) => (
        <div
          className="inline-block h-full"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="flex max-h-full w-64 flex-none snap-center flex-col rounded bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white">
            <div className="header p-1">
              <div className="w-full rounded-md p-2 font-bold">
                <h1>{column.title}</h1>
              </div>
            </div>
            <div className="body columnBodyScrollBar mx-1 flex-1 overflow-y-auto overflow-x-hidden px-1">
              {cards &&
                cards.map((card, index) => (
                  <Card card={card} key={card.id} index={index} />
                ))}
              {provided.placeholder}
            </div>
            <div className="footer p-1">
              <div className="w-full cursor-pointer rounded-md p-2 hover:bg-neutral-400/40 hover:dark:bg-neutral-900/60 ">
                + dodaj czy coś
              </div>
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}
