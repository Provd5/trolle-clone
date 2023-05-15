"use client";

import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { motion } from "framer-motion";

import { CardTypes } from "types/ContentDataStructure";

import Loader from "components/atoms/Loader";

export default function SingleCardPage({ cardId }: { cardId: string }) {
  const [cardData, setCardData] = useState<CardTypes>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_HOSTNAME_URL}/v1/cards/${cardId}`)
      .then((res) => res.json())
      .then((data) => setCardData(data))
      .catch(() => setIsError(true));
  }, [cardId]);

  return (
    <>
      {!cardData ? (
        <Loader loadingText="⏳ Ładowanie..." error={isError} />
      ) : (
        <motion.div
          className="relative m-5 h-full rounded-lg bg-white/50 p-5 text-black"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <Link href={cardData.boardId}>
            <button className="btn-icon hover:bg-neutral-600/30 absolute right-2 top-2 bg-current-2 text-white">
              <RxCross1 className="icon" />
            </button>
          </Link>
          <div className="flex flex-col">
            <div>
              <h1>Tytuł karty:</h1>
              <h1 className="text-xl font-bold">{cardData.title}</h1>
            </div>

            <p className="">{cardData.desc}</p>
          </div>
        </motion.div>
      )}
    </>
  );
}
