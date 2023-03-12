import { CardTypes } from "types/ContentDataStructure";

export default function Card({ card }: { card: CardTypes }) {
  return (
    <div className="cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-100/50 dark:bg-neutral-900 hover:dark:bg-neutral-900/50">
      <div>{card.title}</div>
    </div>
  );
}
