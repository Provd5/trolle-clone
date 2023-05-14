import { Draggable } from "react-smooth-dnd";
import Link from "next/link";

import { CardTypes } from "types/ContentDataStructure";

export default function Card({ card }: { card: CardTypes }) {
  return (
    <Draggable>
      <Link
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
        href={`${card.boardId}/card/${card._id}`}
        className="mb-1 block min-h-[34px] cursor-pointer select-none overflow-hidden rounded-md bg-neutral-100 p-2 text-black drop-shadow-sm hover:bg-neutral-100/50 dark:bg-neutral-900 dark:text-white hover:dark:bg-neutral-900/50"
      >
        <div className="break-words">{card.title}</div>
      </Link>
    </Draggable>
  );
}
