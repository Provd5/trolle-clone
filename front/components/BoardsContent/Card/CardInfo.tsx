import { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import { RxCross1 } from "react-icons/rx";

import { adjustHeight } from "utils/adjustHeight";

import { ButtonIcon } from "components/atoms/ButtonIcon";

import { CardEditDataType } from "./SingleCardPage";

export default function CardInfo({
  title,
  Icon,
  handleChangeData,
  cardData,
  dataType,
}: {
  title: string;
  Icon: IconType;
  handleChangeData: (data: string, dataType: CardEditDataType) => void;
  cardData?: string | null;
  dataType: CardEditDataType;
}) {
  const editDataRef = useRef<HTMLTextAreaElement>(null);

  const [editData, setEditData] = useState(false);

  useEffect(() => {
    if (editData) {
      adjustHeight(editDataRef);
      editDataRef.current?.focus();
      editDataRef.current?.select();
    }
  }, [editData]);

  const handleConfitmEdit = () => {
    if (!editDataRef.current) return;

    if (
      !(editDataRef.current.value.trim().length > 0) &&
      dataType === "title"
    ) {
      editDataRef.current.focus();
      return;
    }

    if (editDataRef.current.value.trim() !== cardData) {
      handleChangeData(editDataRef.current.value, dataType);
    }

    setEditData(false);
  };

  return (
    <div className="mr-1 flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <Icon />
        <h1 className="font-bold">{title}:</h1>
      </div>
      {editData && dataType === "cover" && (
        <p className="text-sm">podaj link(url)</p>
      )}
      <div className="flex items-center gap-1">
        {editData ? (
          <>
            <textarea
              ref={editDataRef}
              defaultValue={
                cardData
                  ? cardData
                  : dataType === "cover"
                  ? "https://placehold.co/600"
                  : ""
              }
              className="verticalScrollBar max-h-[160px] w-full resize-none rounded p-2 text-black dark:text-white"
              onChange={() => adjustHeight(editDataRef)}
              maxLength={dataType === "title" ? 255 : 1000}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleConfitmEdit();
                }
              }}
            />
          </>
        ) : (
          cardData && (
            <button
              className={`pl-2 text-left ${
                dataType === "title"
                  ? "text-2xl"
                  : dataType === "desc"
                  ? "text-xl"
                  : dataType === "cover"
                  ? "truncate text-xl"
                  : ""
              }`}
              onClick={() => setEditData(true)}
            >
              {cardData}
            </button>
          )
        )}
        {editData ? (
          <div className="flex gap-1">
            <ButtonIcon
              color="defaultColor"
              iconSize="iconSm"
              Icon={BsCheck2}
              onClick={() => handleConfitmEdit()}
            />
            <ButtonIcon
              color="defaultColor"
              iconSize="iconSm"
              Icon={RxCross1}
              onClick={() => setEditData(false)}
            />
          </div>
        ) : (
          <ButtonIcon
            color={cardData ? "none" : "defaultColor"}
            Icon={cardData ? FiEdit : AiOutlinePlus}
            iconSize={cardData ? "iconXs" : "icon"}
            restClassNames={cardData ? "defaultHover" : ""}
            onClick={() => setEditData(true)}
          />
        )}
      </div>
    </div>
  );
}
