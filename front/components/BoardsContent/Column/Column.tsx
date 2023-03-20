import { Container, Draggable } from "react-smooth-dnd";
import { DropResult } from "smooth-dnd";

import { ColumnTypes } from "types/ContentDataStructure";

import { MapOrder } from "utils/MapOrder";

import Card from "../Card/Card";

export default function Column({ column }: { column: ColumnTypes }) {
  const cards = MapOrder(column.cards, column.cardsOrder);

  const onCardDrop = (result: DropResult) => {
    console.log(result);
  };

  return (
    <Draggable>
      <div className="mx-1 inline-block h-full">
        <div className="flex max-h-full w-64 flex-none flex-col rounded bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white">
          <div className="header column-drag-handle flex w-full cursor-grab p-1 font-bold">
            <div className="w-full rounded-md p-2">
              <h1>{column.title}</h1>
            </div>
          </div>
          <div className="body columnBodyScrollBar mx-1 min-h-[30px] flex-1 overflow-y-auto overflow-x-hidden px-1">
            <Container
              // onDragStart={(e) => console.log("drag started", e)}
              // onDragEnd={(e) => console.log("drag end", e)}
              // onDragEnter={() => {
              //   console.log("drag enter:", column.id);
              // }}
              // onDragLeave={() => {
              //   console.log("drag leave:", column.id);
              // }}
              // onDropReady={(p) => console.log("Drop ready: ", p)}
              // onDrop={onCardDrop}
              groupName="col"
              getChildPayload={(index) => cards[index]}
              dragClass="card-ghost"
              dropClass="card-ghost-drop"
              dropPlaceholder={{
                animationDuration: 150,
                showOnTop: true,
                className: "drop-preview",
              }}
              dropPlaceholderAnimationDuration={200}
            >
              {cards && cards.map((card) => <Card card={card} key={card.id} />)}
            </Container>
          </div>
          <div className="footer flex w-full p-1">
            <div className="w-full cursor-pointer rounded-md p-2 hover:bg-neutral-400/40 hover:dark:bg-neutral-900/60 ">
              + dodaj czy coś
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
