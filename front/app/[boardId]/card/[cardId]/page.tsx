import { Loader } from "components/atoms/Loader";
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
          errorText="😞 Problem z załadowaniem karty, sprawdź czy dana karta na pewno
         istnieje."
          error
        />
      ) : (
        <SingleCardPage cardId={cardId} />
      )}
    </>
  );
}
