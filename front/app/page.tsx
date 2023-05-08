import { getBoard } from "services/getApi";

import Board from "components/BoardsContent/Board/Board";

export default async function Home() {
  // "6449886520bf64da40c62240" "64497ebfafea212b0aeb4450";
  const boardId = "64497ebfafea212b0aeb4450";
  const boardData = await getBoard(boardId);

  return (
    <section className="h-full w-full overflow-hidden">
      <div className="gradient-dir-1 relative flex h-full flex-col">
        {boardData?._id ? (
          <Board boardData={boardData} />
        ) : (
          <div className="flex w-full items-center justify-center p-5">
            Dana tablica nie istnieje
          </div>
        )}
      </div>
    </section>
  );
}
