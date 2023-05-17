import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { motion } from "framer-motion";

import { BoardTypes } from "types/ContentDataStructure";

import { updateBoard } from "services/putApi";
import { dateFormater } from "utils/dateFormater";

import { Button } from "components/atoms/Button";
import { ButtonIcon } from "components/atoms/ButtonIcon";

export default function HomeBoard({
  board,
  onUpdateBoard,
}: {
  board: BoardTypes;
  onUpdateBoard: (newBoardToUpdate: BoardTypes) => void;
}) {
  const [toggleDelete, setToggleDelete] = useState(false);

  const handleDeleteBoard = () => {
    const newBoard = {
      ...board,
      _destroy: true,
    };

    updateBoard(newBoard._id, newBoard);
    onUpdateBoard(newBoard);
  };

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
    >
      {!toggleDelete ? (
        <Link href={board._id} className="focusOutline">
          <div className="mx-auto flex h-44 w-10/12 flex-col justify-between overflow-hidden rounded-lg bg-current-2 p-3 drop-shadow-lg transition-transform hover:scale-105 xs:w-7/12 sm:w-60">
            <p className="max-h-[80px] overflow-hidden font-bold">
              {board.title}
            </p>
            <div className="flex justify-between text-right">
              <div className="flex items-end">
                <ButtonIcon
                  color="none"
                  Icon={MdDelete}
                  iconSize="icon"
                  restClassNames="defaultHover"
                  onClick={(e) => {
                    setToggleDelete(true);
                    e.preventDefault();
                  }}
                />
              </div>
              <div>
                <div>
                  <p className="text-sm font-bold">Utworzona:</p>
                  <p className="text-sm">{dateFormater(board.createdAt)}</p>
                </div>
                {board.updatedAt && (
                  <div>
                    <p className="text-sm font-bold">Ostatnia zmiana:</p>
                    <p className="text-sm">{dateFormater(board.updatedAt)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="mx-auto flex h-44 w-10/12 flex-col items-center justify-center overflow-hidden rounded-lg bg-current-2 p-3 drop-shadow-lg transition-transform xs:w-7/12 sm:w-60">
          <p className="px-3 pb-5">
            Jesteś pewien, że chcesz <span className="font-bold">usunąć</span>{" "}
            tablicę{" "}
            <span className="font-bold">
              {board.title.length < 25
                ? board.title
                : `${board.title.substring(0, 25)}...`}
            </span>
            ?
          </p>
          <div className="flex gap-5">
            <Button color="errorColor" onClick={() => handleDeleteBoard()}>
              Usuń
            </Button>
            <Button color="grayColor" onClick={() => setToggleDelete(false)}>
              Anuluj
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
