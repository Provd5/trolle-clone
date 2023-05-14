"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { BoardTypes } from "types/ContentDataStructure";

import { dataFormater } from "utils/dataFormater";

import Loader from "components/Loader";

export default function HomeBoards() {
  const [boardsData, setBoardData] = useState<BoardTypes[]>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_HOSTNAME_URL}/v1/boards`)
      .then((res) => res.json())
      .then((data) => {
        setBoardData(data);
      });
  }, []);

  return (
    <>
      <p className="flex w-full items-center p-3 font-bold">Twoje tablice:</p>
      {!boardsData ? (
        <Loader loadingText="⏳ Ładowanie..." />
      ) : !(boardsData.length > 0) ? (
        <Loader loadingText="Brak tablic" />
      ) : (
        <div className="flex flex-wrap gap-3 px-5">
          {boardsData.map((board) => (
            <Link key={board._id} href={board._id}>
              <div className="flex h-32 w-40 flex-col justify-between rounded-lg bg-current-2 p-3 drop-shadow-lg transition-transform hover:scale-110">
                <p className="max-h-[54px]">{board.title}</p>
                <div className="text-right">
                  <p className="text-sm">Utworzona:</p>
                  <p className="text-sm">{dataFormater(board.createdAt)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
