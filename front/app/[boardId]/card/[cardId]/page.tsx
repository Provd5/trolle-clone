import Loader from "components/atoms/Loader";

export default async function Card({ params }: { params: { cardId: string } }) {
  //   const boardData = await getBoard(params.id.toString());
  const cardData = null;

  return (
    <>
      {!cardData || !(Object.keys(cardData).length > 0) ? (
        <Loader loadingText="😞 Problem z załadowaniem karty, spróbuj ponownie później." />
      ) : (
        <>
          <div className="flex h-[54px] items-center justify-between bg-current-2 px-3 md:h-[64px] md:px-5"></div>
        </>
      )}
    </>
  );
}
