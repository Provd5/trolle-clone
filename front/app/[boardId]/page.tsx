import Board from "components/BoardsContent/Board/Board";
import Loader from "components/atoms/Loader";

export default async function BoardPage({
  params,
}: {
  params: { boardId: string };
}) {
  const boardId = params.boardId;

  return (
    <>
      {!boardId || !(Object.keys(boardId).length > 0) ? (
        <Loader
          loadingText="😞 Problem z załadowaniem tablicy, sprawdź czy dana tablica na pewno
         istnieje."
        />
      ) : (
        <Board boardId={boardId} />
      )}
    </>
  );
}
