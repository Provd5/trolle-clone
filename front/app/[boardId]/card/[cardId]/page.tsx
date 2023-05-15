import Loader from "components/atoms/Loader";
import SingleCardPage from "components/BoardsContent/Card/SingleCardPage";

export default async function CardPage({
  params,
}: {
  params: { cardId: string };
}) {
  const cardId = params.cardId;

  return (
    <>
      {!cardId ? (
        <Loader
          loadingText="😞 Problem z załadowaniem tablicy, sprawdź czy dana tablica na pewno
         istnieje."
        />
      ) : (
        <SingleCardPage cardId={cardId} />
      )}
    </>
  );
}
