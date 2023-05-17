import {
  Dispatch,
  FocusEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Container, Draggable, DropResult } from "react-smooth-dnd";

import { BoardTypes, CardTypes, ColumnTypes } from "types/ContentDataStructure";

import { useClickOutside } from "hooks/useClickOutside";
import { useDragScroll } from "hooks/useDragScroll";
import { postNewCard } from "services/postApi";
import { updateColumn } from "services/putApi";
import { adjustHeight } from "utils/adjustHeight";
import { mapOrder } from "utils/mapOrder";

import { ButtonIcon } from "components/atoms/ButtonIcon";
import { AddItem } from "components/BoardsContent/AddItem";

import Card from "../Card/Card";
import MoreOptionsModal from "./MoreOptionsModal";

export default function Column({
  board,
  column,
  setAllowDrag,
  onUpdateColumn,
  onCardDrop,
}: {
  board: BoardTypes;
  column: ColumnTypes;
  setAllowDrag: Dispatch<SetStateAction<boolean>>;
  onUpdateColumn: (newColumnToUpdate: ColumnTypes) => void;
  onCardDrop: (columnId: ColumnTypes["_id"], result: DropResult) => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const columnTitleInputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLButtonElement | HTMLDivElement>(null);

  const [moreOptionsModal, setMoreOptionsModal] = useState(false);
  const [stopScrollingY, setStopScrollingY] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [columnTitle, setColumnTitle] = useState(column.title);

  const cards: CardTypes[] = column.cardsOrder
    ? mapOrder(column.cards, column.cardsOrder)
    : column.cards;

  useDragScroll(scrollRef as RefObject<HTMLDivElement>, stopScrollingY);
  useDragScroll(
    columnTitleInputRef as unknown as RefObject<HTMLDivElement>,
    stopScrollingY
  );
  useClickOutside(modalRef, setMoreOptionsModal, false);
  useClickOutside(columnTitleInputRef, setEditTitle, false, true);

  useEffect(() => {
    if (editTitle) {
      adjustHeight(columnTitleInputRef);
      columnTitleInputRef.current?.focus();
      columnTitleInputRef.current?.select();
    }
  }, [editTitle]);

  const addItemFunction = (data: CardTypes) => {
    postNewCard(data).then((result) => {
      const insertedId = result.insertedId;

      let newColumn = { ...column };
      newColumn.cards.push({ ...data, _id: insertedId });
      newColumn.cardsOrder?.push(data._id);

      onUpdateColumn(newColumn);
    });
  };

  const handleChangeTitle = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value !== columnTitle) {
      e.target.value.trim().length > 0 &&
        updateColumn(column._id, { ...column, title: e.target.value }).then(
          () => setColumnTitle(e.target.value)
        );
      const newColumn = {
        ...column,
        title: columnTitle,
      };
      onUpdateColumn(newColumn);
    }
  };

  const handleDeleteColumn = () => {
    const newColumn = {
      ...column,
      _destroy: true,
    };
    updateColumn(newColumn._id, newColumn);
    onUpdateColumn(newColumn);
  };

  return (
    <Draggable>
      <div className="column-wrapper">
        <div
          className="relative flex max-h-full w-72 flex-col rounded-lg bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white"
          onMouseDown={() => setAllowDrag(false)}
          onMouseUp={() => setAllowDrag(true)}
          onMouseLeave={() => setAllowDrag(true)}
        >
          <div className="column-header flex max-w-full items-start gap-1 p-1">
            {!editTitle ? (
              <button
                className="verticalScrollBar column-drag-handle max-h-[160px] w-full cursor-grab overflow-y-auto rounded-md p-2 text-left"
                ref={scrollRef as RefObject<HTMLButtonElement>}
                onClick={() => setEditTitle(true)}
              >
                <h1 className="overflow-anywhere font-bold">{columnTitle}</h1>
              </button>
            ) : (
              <textarea
                className="max-h-[160px] w-full resize-none rounded-md p-2"
                placeholder="Podaj tytuł listy..."
                ref={columnTitleInputRef}
                defaultValue={columnTitle}
                onChange={() => adjustHeight(columnTitleInputRef)}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                onBlur={(e) => {
                  handleChangeTitle(e);
                  setEditTitle(false);
                }}
                maxLength={255}
              />
            )}
            <ButtonIcon
              color="none"
              Icon={BiDotsHorizontalRounded}
              iconSize="icon"
              restClassNames="defaultHover"
              onClick={() => setMoreOptionsModal(true)}
            />
            {moreOptionsModal && (
              <MoreOptionsModal
                modalRef={modalRef}
                handleDeleteColumn={handleDeleteColumn}
              />
            )}
          </div>
          <div
            className="column-body verticalScrollBar mx-1 overflow-y-auto overflow-x-hidden px-1"
            ref={scrollRef as RefObject<HTMLDivElement>}
          >
            <Container
              onDragStart={() => setStopScrollingY(true)}
              onDragEnd={() => setStopScrollingY(false)}
              onDrop={(result) => onCardDrop(column._id, result)}
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
              {cards &&
                cards.map((card: CardTypes) => (
                  <Card card={card} key={card._id} />
                ))}
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
