import { Draggable } from "react-smooth-dnd";

import { CardTypes } from "types/ContentDataStructure";

export default function Card({ card }: { card: CardTypes }) {
  return (
    <Draggable>
      <div className="CARD mb-1 block cursor-pointer select-none overflow-hidden rounded-md bg-neutral-100 p-2 text-black hover:bg-neutral-100/50 dark:bg-neutral-900 dark:text-white hover:dark:bg-neutral-900/50">
        <div>{card.title}</div>
      </div>
    </Draggable>
  );
}
