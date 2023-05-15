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
      <Link href={board._id}>
        <div className="flex h-44 w-52 flex-col justify-between rounded-lg bg-current-2 p-3 drop-shadow-lg transition-transform hover:scale-110">
          <p className="max-h-[54px]">{board.title}</p>
          <div className="flex justify-between text-right">
            <div className="flex items-end">
              <MdDelete
                className="btn-icon h-7 w-7"
                onClick={(e) => {
                  handleDeleteBoard();
                  e.preventDefault();
                }}
              />
            </div>
            <div>
              <div>
                <p className="text-sm">Utworzona:</p>
                <p className="text-sm">{dataFormater(board.createdAt)}</p>
              </div>
              {board.updatedAt && (
                <div>
                  <p className="text-sm">Ostatnia zmiana:</p>
                  <p className="text-sm">
                    {dataFormater(board.updatedAt, true)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
