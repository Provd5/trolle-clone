import React, { RefObject } from "react";
import FocusTrap from "focus-trap-react";

export default function MoreOptionsModal({
  modalRef,
  toggleEditTitle,
}: {
  modalRef: RefObject<HTMLDivElement>;
  toggleEditTitle: (arg: boolean) => void;
}) {
  return (
    <FocusTrap>
      <div
        ref={modalRef}
        className="absolute top-[40px] right-[-20px] z-50 flex w-[200px] flex-col items-start justify-center rounded border border-neutral-400/50 bg-neutral-100 shadow-lg dark:bg-neutral-900"
      >
        <button
          className="dropdown-item"
          tabIndex={0}
          onClick={() => toggleEditTitle(true)}
        >
          <div className="text-start">Edytuj tytuł</div>
        </button>
        <button className="dropdown-item" tabIndex={0}>
          <div className="text-start">Kopiuj kartę</div>
        </button>
        <button className="dropdown-item" tabIndex={0}>
          <div className="text-start">
            Nie wiem co ale wpiszę tutaj długi tekst
          </div>
        </button>
      </div>
    </FocusTrap>
  );
}
