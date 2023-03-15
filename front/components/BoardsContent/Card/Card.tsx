import { Draggable } from "react-beautiful-dnd";

import { CardTypes } from "types/ContentDataStructure";

export default function Card({
  card,
  index,
}: {
  card: CardTypes;
  index: number;
}) {
  return (
    <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
      {(provided, snapshot) => (
        <a
          className={`mb-1 block cursor-pointer select-none rounded-md bg-neutral-100 p-2 hover:bg-neutral-100/50 dark:bg-neutral-900 hover:dark:bg-neutral-900/50 ${
            snapshot.isDragging ? `shadow-lg` : ``
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <div>{card.title}</div>
        </a>
      )}
    </Draggable>
  );
}
