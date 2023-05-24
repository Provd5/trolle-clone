import Link from "next/link";

export default function NotFound() {
  return (
    <div className="m-3 flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-white/90 p-5 text-current-1">
        <h1 className="text-xl">
          <span className="font-bold">404</span> - Ta strona nie istnieje albo
          została usunięta.
        </h1>
        <Link
          href="/"
          className="underline transition-transform hover:scale-105"
        >
          Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
}
