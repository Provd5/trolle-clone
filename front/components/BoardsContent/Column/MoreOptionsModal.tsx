import React, { RefObject, useState } from "react";
import { MdDelete } from "react-icons/md";
import FocusTrap from "focus-trap-react";

import { Button } from "components/atoms/Button";

export default function MoreOptionsModal({
  modalRef,
  handleDeleteColumn,
}: {
  modalRef: RefObject<HTMLDivElement>;
  handleDeleteColumn: () => void;
}) {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  return (
    <FocusTrap>
      <div
        ref={modalRef}
        className={` absolute right-[-20px] top-[40px] z-50 flex w-[200px] flex-col items-start justify-center rounded border border-neutral-400/50 bg-neutral-100 shadow-lg dark:bg-neutral-900`}
      >
        <button className="dropdown-item">
          <div className="text-start">
            Nie wiem co ale wpiszę tutaj długi tekst
          </div>
        </button>
        {!openConfirmModal ? (
          <button
            className="dropdown-item"
            onClick={() => setOpenConfirmModal(true)}
          >
            <div className="flex items-center gap-1 text-start">
              <MdDelete className="text-error" /> Usuń listę
            </div>
          </button>
        ) : (
          <FocusTrap>
            <div className="flex flex-col gap-2 border-t border-neutral-300/50 p-3 dark:border-neutral-700/50">
              <div>
                Czy na pewno chcesz <span className="font-bold">usunąć</span> tę
                listę razem z jej zawartością?
              </div>
              <div className="flex justify-between px-1">
                <Button color="errorColor" onClick={handleDeleteColumn}>
                  Usuń
                </Button>
                <Button
                  color="grayColor"
                  onClick={() => setOpenConfirmModal(false)}
                >
                  Anuluj
                </Button>
              </div>
            </div>
          </FocusTrap>
        )}
      </div>
    </FocusTrap>
  );
}
