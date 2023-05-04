import { getBoard } from "services/getApi";

import Board from "components/BoardsContent/Board/Board";

export default async function Home() {
  // "6449886520bf64da40c62240" "64497ebfafea212b0aeb4450";
  const boardId = "64497ebfafea212b0aeb4450";
  const boardData = await getBoard(boardId);
  console.log(boardData.columns);

  return (
    <section className="h-full w-full overflow-hidden">
      <Board boardData={boardData} />
    </section>
  );
}
