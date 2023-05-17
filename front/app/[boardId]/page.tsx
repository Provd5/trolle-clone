import { Loader } from "components/atoms/Loader";
import Board from "components/BoardsContent/Board/Board";

export default async function BoardPage({
  params,
}: {
  params: { boardId: string };
}) {
  const boardId = params.boardId;

  return (
    <>
      {!boardId ? (
        <Loader
          errorText="😞 Problem z załadowaniem tablicy, sprawdź czy dana tablica na pewno
         istnieje."
          error
        />
      ) : (
        <Board boardId={boardId} />
      )}
    </>
  );
}
