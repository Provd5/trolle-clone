export default function Loader({ loadingText }: { loadingText: string }) {
  return <div className="flex w-full justify-center p-5">{loadingText}</div>;
}
