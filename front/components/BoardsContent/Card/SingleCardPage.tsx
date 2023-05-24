"use client";

import { useEffect, useState } from "react";
import { BsCardImage, BsTextLeft } from "react-icons/bs";
import { MdDateRange, MdDelete, MdUpdate } from "react-icons/md";
import { RxCross1, RxText } from "react-icons/rx";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";

import { CardTypes } from "types/ContentDataStructure";

import { updateCard } from "services/putApi";
import { dateFormater } from "utils/dateFormater";

import { ButtonIcon } from "components/atoms/ButtonIcon";
import { Loader } from "components/atoms/Loader";

import CardInfo from "./CardInfo";

export type CardEditDataType = "title" | "desc" | "cover";

export default function SingleCardPage({ cardId }: { cardId: string }) {
  const [cardData, setCardData] = useState<CardTypes>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_HOSTNAME_URL}/v1/cards/${cardId}`)
      .then((res) => res.json())
      .then((data) => setCardData(data))
      .catch(() => setIsError(true));
  }, [cardId]);

  const handleChangeData = (data: string, dataType: CardEditDataType) => {
    if (!cardData) return;

    const newCard = { ...cardData, [dataType]: data };
    updateCard(cardData._id, newCard).then(() =>
      setCardData({ ...newCard, updatedAt: Date.now() })
    );
  };

  const handleDeleteCard = () => {
    if (!cardData) return;

    const newCard = {
      ...cardData,
      _destroy: true,
    };

    updateCard(newCard._id, newCard).then(() => {
      if (typeof window !== "undefined") {
        window.location.href = `${process.env.NEXT_PUBLIC_HOSTNAME_URL}/${cardData.boardId}`;
      }
    });
  };

  return (
    <>
      {!cardData ? (
        <Loader error={isError} />
      ) : !cardData.boardId ? (
        notFound()
      ) : (
        <motion.div
          className="relative mx-3 my-3 h-full overflow-y-auto overflow-x-hidden rounded-lg md:mx-[7vw] md:my-7 xl:mx-auto xl:max-w-[1200px]"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {cardData.cover && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("${cardData.cover}")`,
              }}
            />
          )}
          <div className="h-full bg-white/70 p-5 text-black backdrop-blur sm:p-10">
            <Link href={cardData.boardId}>
              <ButtonIcon
                color="defaultColor"
                Icon={RxCross1}
                iconSize="iconSm"
                restClassNames="absolute right-3 top-3"
              />
            </Link>

            <div className="flex h-full flex-col justify-between gap-3">
              <div className="flex flex-col gap-3">
                <CardInfo
                  title="Tytuł karty"
                  Icon={RxText}
                  handleChangeData={handleChangeData}
                  cardData={cardData.title}
                  dataType="title"
                />
                <CardInfo
                  title="Opis"
                  Icon={BsTextLeft}
                  handleChangeData={handleChangeData}
                  cardData={cardData.desc}
                  dataType="desc"
                />
                <CardInfo
                  title="Okładka"
                  Icon={BsCardImage}
                  handleChangeData={handleChangeData}
                  cardData={cardData.cover}
                  dataType="cover"
                />
                {cardData.cover && (
                  <div
                    className="h-52 w-full rounded-lg bg-cover bg-center bg-no-repeat xs:w-80"
                    style={{
                      backgroundImage: `url("${cardData.cover}")`,
                    }}
                  />
                )}
              </div>

              <div className="flex items-end justify-between">
                <ButtonIcon
                  color="errorColor"
                  Icon={MdDelete}
                  iconSize="icon"
                  onClick={handleDeleteCard}
                />
                <div className="flex flex-col gap-1">
                  {cardData.createdAt && (
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <MdDateRange />
                        <h1 className="font-bold">Utworzona:</h1>
                      </div>
                      <h1>{dateFormater(cardData.createdAt)}</h1>
                    </div>
                  )}
                  {cardData.updatedAt && (
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <MdUpdate />
                        <h1 className="font-bold">Zmodyfikowana:</h1>
                      </div>
                      <h1>{dateFormater(cardData.updatedAt)}</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
