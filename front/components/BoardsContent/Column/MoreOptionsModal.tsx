import React, { RefObject } from "react";
import FocusTrap from "focus-trap-react";

export default function MoreOptionsModal({
  modalRef,
}: {
  modalRef: RefObject<HTMLDivElement>;
}) {
  return (
    <FocusTrap>
      <div
        ref={modalRef}
        className="border-default absolute top-[40px] right-[-20px] z-50 flex w-[300px] flex-col items-start justify-center rounded border bg-neutral-100 py-2 shadow-lg dark:bg-neutral-900"
      >
        <a
          className="w-full cursor-pointer px-2 hover:bg-neutral-200/50 hover:dark:bg-neutral-800/50"
          tabIndex={0}
        >
          <div className="p-2">Nowa karta</div>
        </a>
        <a
          className="w-full cursor-pointer px-2 hover:bg-neutral-200/50 hover:dark:bg-neutral-800/50"
          tabIndex={0}
        >
          <div className="p-2">Kopiuj kartę</div>
        </a>
        <a
          className="w-full cursor-pointer px-2 hover:bg-neutral-200/50 hover:dark:bg-neutral-800/50"
          tabIndex={0}
        >
          <div className="p-2">Nie wiem co ale wpiszę tutaj długi tekst</div>
        </a>
      </div>
    </FocusTrap>
  );
}
