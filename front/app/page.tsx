import { getBoard } from "services/getApi";

import BoardContent from "components/BoardsContent/Board/BoardContent";

export default async function Home() {
  // "6449886520bf64da40c62240" "64497ebfafea212b0aeb4450";
  const boardId = "64497ebfafea212b0aeb4450";
  const boardData = await getBoard(boardId);

  return (
    <section className="h-full w-full overflow-hidden">
      <div className="gradient-dir-1 relative flex h-full flex-col">
        {!boardData || !(Object.keys(boardData).length > 0) ? (
          <div className="flex w-full items-center justify-center p-5">
            😞 Problem z załadowaniem tablicy, sprawdź czy dana tablica na pewno
            istnieje.
          </div>
        ) : (
          <>
            <div className="flex min-h-[40px] items-center justify-between px-4 py-3">
              <div>{boardData.title}</div>
              <div>jakas ikona</div>
            </div>
            <div className="relative mb-2 h-full select-none">
              <BoardContent boardData={boardData} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
