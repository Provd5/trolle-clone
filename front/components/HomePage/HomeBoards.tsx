"use client";

import { useEffect, useRef, useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";

import { BoardTypes } from "types/ContentDataStructure";

import { postNewBoard } from "services/postApi";

import Loader from "components/atoms/Loader";

import HomeBoard from "./HomeBoard";

export default function HomeBoards() {
  const addBoardRef = useRef<HTMLInputElement>(null);

  const [isError, setIsError] = useState(false);
  const [boardsData, setBoardData] = useState<BoardTypes[]>();
  const [addBoard, setAddBoard] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_HOSTNAME_URL}/v1/boards`)
      .then((res) => res.json())
      .then((data) => setBoardData(data))
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    if (addBoard) {
      addBoardRef.current?.focus();
      addBoardRef.current?.select();
    }
  }, [addBoard]);

  const onUpdateBoard = (newBoardToUpdate: BoardTypes) => {
    if (!boardsData) return;

    let newBoards = [...boardsData];
    const boardIndexToUpdate = newBoards.findIndex(
      (index) => index._id === newBoardToUpdate._id
    );

    newBoardToUpdate._destroy
      ? newBoards.splice(boardIndexToUpdate, 1)
      : newBoards.splice(boardIndexToUpdate, 1, newBoardToUpdate);

    setBoardData(newBoards);
  };

  const onAddBoard = (data: string) => {
    if (!addBoardRef.current) return;

    if (!(addBoardRef.current?.value.trim().length > 0)) {
      addBoardRef.current?.focus();
      return;
    }

    postNewBoard({ title: data.trim() }).then((result) => {
      if (!boardsData) return;
      const insertedId = result.insertedId;

      let newBoards = [...boardsData];
      newBoards.push({
        ...newBoards,
        _id: insertedId,
        title: data.trim(),
        createdAt: Date.now(),
        _destroy: false,
        columns: [],
      });

      setAddBoard(false);
      setBoardData(newBoards);
    });
  };

  return (
    <>
      <p className="flex w-full items-center p-3 font-bold">Twoje tablice:</p>
      {!boardsData ? (
        <Loader loadingText="⏳ Ładowanie..." error={isError} />
      ) : !(boardsData.length > 0) ? (
        <Loader loadingText="Brak tablic" />
      ) : (
        <div className="flex flex-wrap gap-3 px-5">
          {boardsData.map((board) => (
            <HomeBoard
              key={board._id}
              board={board}
              onUpdateBoard={onUpdateBoard}
            />
          ))}
          <div
            className={`flex h-44 w-52 cursor-pointer flex-col items-center justify-center rounded-lg bg-current-2/50 p-3 drop-shadow-lg transition-transform ${
              addBoard ? "" : "hover:scale-110"
            }`}
            onClick={() => !addBoard && setAddBoard(true)}
          >
            {addBoard ? (
              <div className="flex h-full flex-col items-center justify-between p-3">
                <p>Podaj nazwę tablicy:</p>
                <input
                  ref={addBoardRef}
                  defaultValue={"Nowa tablica"}
                  className="w-full rounded px-1 py-2 text-xl text-black"
                />
                <div className="flex gap-2">
                  <button
                    className="btn-default hover:bg-neutral-600/30 bg-current-1 text-white"
                    onClick={() =>
                      addBoardRef.current &&
                      onAddBoard(addBoardRef.current.value)
                    }
                  >
                    dodaj
                  </button>
                  <button
                    className="btn-icon hover:bg-neutral-600/30 bg-current-1 text-white"
                    onClick={() => setAddBoard(false)}
                  >
                    <RxCross1 className="icon" />
                  </button>
                </div>
              </div>
            ) : (
              <BsFillPlusCircleFill className="icon-xs" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
