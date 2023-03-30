import { useRef } from "react";
import FocusTrap from "focus-trap-react";

import { useClickOutside } from "hooks/useClickOutside";

import { ModalsType } from "./Navbar";

export default function NavbarModalsWrapper({
  children,
  toggleModal,
}: {
  children: React.ReactNode;
  toggleModal: (modalName: ModalsType) => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, toggleModal, null);

  return (
    <FocusTrap>
      <div
        className="border-default absolute top-0 right-0 z-50 mr-3 mt-1 min-w-[100px] rounded border bg-white p-2 text-black shadow-lg"
        ref={modalRef}
      >
        {children}
        <button className="flex" onClick={() => toggleModal(null)}></button>
      </div>
    </FocusTrap>
  );
}
