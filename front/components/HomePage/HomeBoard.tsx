import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { motion } from "framer-motion";

import { BoardTypes } from "types/ContentDataStructure";

import { updateBoard } from "services/putApi";
import { dataFormater } from "utils/dataFormater";

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
    >
      {!toggleDelete ? (
        <Link href={board._id}>
          <div className="flex h-44 w-52 flex-col justify-between rounded-lg bg-current-2 p-3 drop-shadow-lg transition-transform hover:scale-110">
            <p className="max-h-[80px] overflow-hidden font-bold">
              {board.title}
            </p>
            <div className="flex justify-between text-right">
              <div className="flex items-end">
                <MdDelete
                  className="btn-icon h-7 w-7"
                  onClick={(e) => {
                    setToggleDelete(true);
                    e.preventDefault();
                  }}
                />
              </div>
              <div>
                <div>
                  <p className="text-sm font-bold">Utworzona:</p>
                  <p className="text-sm">{dataFormater(board.createdAt)}</p>
                </div>
                {board.updatedAt && (
                  <div>
                    <p className="text-sm font-bold">Ostatnia zmiana:</p>
                    <p className="text-sm">
                      {dataFormater(board.updatedAt, true)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="flex h-44 w-52 flex-col items-center justify-around rounded-lg bg-current-2 p-3 drop-shadow-lg transition-transform">
          <p>
            Jesteś pewien, że chcesz <span className="font-bold">usunąć</span>{" "}
            tablicę <span className="font-bold">{board.title}</span>?
          </p>
          <div className="flex gap-5">
            <button
              className="btn-default hover:bg-error/80 bg-error text-white focus:bg-error"
              onClick={() => handleDeleteBoard()}
            >
              Usuń
            </button>
            <button
              className="btn-default hover:bg-neutral-400/80 bg-neutral-400 text-white"
              onClick={() => setToggleDelete(false)}
              tabIndex={1}
            >
              <div>Anuluj</div>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
