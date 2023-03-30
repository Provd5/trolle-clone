import React, { Dispatch, RefObject, SetStateAction, useState } from "react";
import FocusTrap from "focus-trap-react";

export default function MoreOptionsModal({
  modalRef,
  handleDeleteColumn,
  setMoreOptionsModal,
}: {
  modalRef: RefObject<HTMLDivElement>;
  handleDeleteColumn: () => void;
  setMoreOptionsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  return (
    <FocusTrap>
      <div
        ref={modalRef}
        className={` absolute top-[40px] right-[-20px] z-50 flex w-[200px] flex-col items-start justify-center rounded border border-neutral-400/50 bg-neutral-100 shadow-lg dark:bg-neutral-900`}
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
            <div className="text-start">Usuń listę</div>
          </button>
        ) : (
          <FocusTrap>
            <div className="flex flex-col gap-2 border-t border-neutral-300/50 p-3 dark:border-neutral-700/50">
              <div>
                Czy na pewno chcesz <span className="font-bold">usunąć</span> tę
                listę razem z jej zawartością?
              </div>
              <div className="flex justify-between px-1">
                <button
                  className="btn-default bg-error text-white hover:bg-error/80 focus:bg-error"
                  onClick={handleDeleteColumn}
                >
                  <div>Usuń</div>
                </button>
                <button
                  className="btn-default bg-neutral-400 text-white hover:bg-neutral-400/80"
                  onClick={() => setOpenConfirmModal(false)}
                  tabIndex={1}
                >
                  <div>Anuluj</div>
                </button>
              </div>
            </div>
          </FocusTrap>
        )}
      </div>
    </FocusTrap>
  );
}
