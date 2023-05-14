import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDateRange, MdOutlineSubtitles } from "react-icons/md";
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
    fetch("http://localhost:4000/v1/boards")
      .then((res) => res.json())
      .then((data) => setBoardDataState(data))
      .catch(() => setIsError(true));
  }, []);

  return (
    <div className="flex max-h-[75vh] w-52 flex-col gap-1 text-current-1">
      <div className="mb-1 flex justify-center font-bold">Twoje tablice:</div>
      <div className="flex flex-col gap-1 overflow-auto">
        {boardDataState ? (
          boardDataState.map((boardData) => (
            <Link
              href={boardData._id}
              key={boardData._id}
              onClick={() => toggleModal(null)}
            >
              <div className="rounded bg-current-1 px-2 py-3 text-sm text-white hover:bg-current-1/80">
                <div className="flex items-center gap-0.5">
                  <MdOutlineSubtitles /> Nazwa:{" "}
                  <span className="font-bold">{boardData.title}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <MdDateRange /> Utworzona: {dataFormater(boardData.createdAt)}
                </div>
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
          className="flex items-center gap-0.5 rounded p-2 hover:bg-neutral-300/70"
        >
          <AiOutlinePlus />
          Stwórz tablicę
        </Link>
      )}
    </div>
  );
}
