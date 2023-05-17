import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDateRange, MdOutlineSubtitles, MdUpdate } from "react-icons/md";
import Link from "next/link";

import { BoardTypes } from "types/ContentDataStructure";

import { dateFormater } from "utils/dateFormater";

import { Loader } from "components/atoms/Loader";
import { ModalsType } from "components/Navbar/Navbar";

export default function BoardsModal({
  toggleModal,
}: {
  toggleModal: (modalName: ModalsType) => void;
}) {
  const [isError, setIsError] = useState(false);
  const [boardDataState, setBoardDataState] = useState<BoardTypes[]>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_HOSTNAME_URL}/v1/boards`)
      .then((res) => res.json())
      .then((data) => setBoardDataState(data))
      .catch(() => setIsError(true));
  }, []);

  return (
    <div className="flex max-h-[75vh] w-60 flex-col gap-1 text-current-1">
      <Link
        href={"/"}
        className="mb-1 flex justify-center p-1 font-bold hover:scale-105"
        onClick={() => toggleModal(null)}
      >
        Twoje tablice
      </Link>
      <div className="verticalScrollBar flex flex-col overflow-auto">
        {boardDataState ? (
          boardDataState.map((boardData) => (
            <Link
              href={boardData._id}
              key={boardData._id}
              onClick={() => toggleModal(null)}
            >
              <div className="m-1 rounded bg-current-1 px-1 py-3 text-md text-white hover:bg-current-1/80">
                <div className="flex flex-wrap items-center gap-x-0.5">
                  <MdOutlineSubtitles />{" "}
                  <span className="font-bold">Nazwa:</span>{" "}
                  <span className="max-h-[52px] overflow-hidden">
                    {boardData.title}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-0.5">
                  <MdDateRange /> <span className="font-bold">Utworzona:</span>
                  <span className="whitespace-nowrap">
                    {dateFormater(boardData.createdAt)}
                  </span>
                </div>
                {boardData.updatedAt && (
                  <div className="flex flex-wrap items-center gap-x-0.5">
                    <MdUpdate />{" "}
                    <span className="font-bold">Zmodyfikowana:</span>
                    <span className="whitespace-nowrap">
                      {dateFormater(boardData.updatedAt)}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <Loader error={isError} />
        )}
      </div>
      {window.location.pathname !== "/" && (
        <Link
          href={"/"}
          onClick={() => toggleModal(null)}
          className="defaultHover flex items-center gap-0.5 rounded p-2"
        >
          <AiOutlinePlus />
          Stwórz tablicę
        </Link>
      )}
    </div>
  );
}
