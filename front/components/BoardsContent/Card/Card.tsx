import { BsTextLeft } from "react-icons/bs";
import { Draggable } from "react-smooth-dnd";
import Link from "next/link";

import { CardTypes } from "types/ContentDataStructure";

export default function Card({ card }: { card: CardTypes }) {
  return (
    <Draggable>
      <Link
        href={`${card.boardId}/card/${card._id}`}
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
        className="mb-1 block min-h-[34px] cursor-pointer select-none overflow-hidden rounded-md bg-neutral-100 p-2 text-black drop-shadow-sm hover:bg-neutral-100/50 dark:bg-neutral-900 dark:text-white hover:dark:bg-neutral-900/50"
      >
        <div className="flex flex-col gap-1 break-words">
          {card.cover && (
            <div
              className="h-28 rounded-t-lg bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("${card.cover}")`,
              }}
            />
          )}
          {card.title}
          {card.desc && <BsTextLeft />}
        </div>
      </Link>
    </Draggable>
  );
}
