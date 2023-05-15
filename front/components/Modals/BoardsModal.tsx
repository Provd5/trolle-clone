import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDateRange, MdOutlineSubtitles, MdUpdate } from "react-icons/md";
import Link from "next/link";

import { BoardTypes } from "types/ContentDataStructure";

import { dataFormater } from "utils/dataFormater";

import Loader from "components/atoms/Loader";
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
    <div className="flex max-h-[75vh] w-52 flex-col gap-1 text-current-1">
      <Link
        href={"/"}
        className="mb-1 flex justify-center font-bold"
        onClick={() => toggleModal(null)}
      >
        Twoje tablice:
      </Link>
      <div className="flex flex-col gap-1 overflow-auto">
        {boardDataState ? (
          boardDataState.map((boardData) => (
            <Link
              href={boardData._id}
              key={boardData._id}
              onClick={() => toggleModal(null)}
            >
              <div className="hover:bg-current-1/80 rounded bg-current-1 px-2 py-3 text-sm text-white">
                <div className="flex items-center gap-0.5">
                  <MdOutlineSubtitles /> Nazwa:{" "}
                  <span className="max-h-[50px] overflow-hidden font-bold">
                    {boardData.title}
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  <MdDateRange /> Utworzona: {dataFormater(boardData.createdAt)}
                </div>
                {boardData.updatedAt && (
                  <div className="flex items-center gap-0.5">
                    <MdUpdate /> Zmodyfikowana:
                    <br />
                    {dataFormater(boardData.updatedAt, true)}
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <Loader loadingText="⏳ Ładowanie..." error={isError} />
        )}
      </div>
      {window.location.pathname !== "/" && (
        <Link
          href={"/"}
          onClick={() => toggleModal(null)}
          className="hover:bg-neutral-300/70 flex items-center gap-0.5 rounded p-2"
        >
          <AiOutlinePlus />
          Stwórz tablicę
        </Link>
      )}
    </div>
  );
}
