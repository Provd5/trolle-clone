export default function Loader({
  loadingText,
  error = false,
}: {
  loadingText: string;
  error?: boolean;
}) {
  return (
    <div className="flex w-full justify-center p-5">
      {error ? "❌ Problem z wczytaniem danych!" : loadingText}
    </div>
  );
}
