import { ColumnTypes } from "types/ContentDataStructure";

import Card from "../Card/Card";

export default function Column({ column }: { column: ColumnTypes }) {
  return (
    <div className="flex h-fit max-h-full w-60 flex-none snap-center flex-col items-center justify-center rounded-md bg-neutral-200 dark:bg-neutral-800">
      <div className="header flex w-full p-1 font-bold">
        <div className="w-full rounded-md  p-2">
          <h1>{column.title}</h1>
        </div>
      </div>
      <div className="body columnBodyScrollBar mx-1 flex w-[-webkit-fill-available] max-w-full flex-col gap-1 overflow-y-auto px-1">
        {column.cards &&
          column.cards.map((card) => <Card card={card} key={card.id} />)}
      </div>
      <div className="footer flex w-full p-1">
        <div className="w-full cursor-pointer rounded-md p-2 hover:bg-neutral-400/40 hover:dark:bg-neutral-900/60 ">
          + dodaj czy coś
        </div>
      </div>
    </div>
  );
}
