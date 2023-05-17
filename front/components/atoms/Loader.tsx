import type { FC } from "react";
import { TbLoader3 } from "react-icons/tb";

interface LoaderProps {
  loadingText?: string;
  error?: boolean;
  errorText?: string;
}

export const Loader: FC<LoaderProps> = ({
  loadingText,
  error = false,
  errorText,
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-0.5 p-5">
      {error ? (
        errorText ? (
          errorText
        ) : (
          "❌ Problem z wczytaniem danych!"
        )
      ) : (
        <>
          <div className="flex animate-spin">
            <TbLoader3 className="h-6 w-6" />
          </div>
          {`${loadingText ? loadingText : "Ładowanie..."}`}
        </>
      )}
    </div>
  );
};
