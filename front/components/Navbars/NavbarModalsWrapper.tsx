import { useEffect, useRef } from "react";
import FocusTrap from "focus-trap-react";

import { ModalsType } from "./Navbar";

export default function NavbarModalsWrapper({
  children,
  toggleModal,
}: {
  children: React.ReactNode;
  toggleModal: (modalName: ModalsType) => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent): void {
      if (modalRef.current) {
        !modalRef.current.contains(event.target as Node) && toggleModal(null);
      }
    }

    function handleEscKey(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        toggleModal(null);
      }
    }

    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  });
  return (
    <FocusTrap>
      <div
        className="border-default absolute top-0 right-0 mr-3 mt-1 min-w-[100px] rounded border bg-white p-2 text-black shadow-lg"
        ref={modalRef}
      >
        {children}
        <button className="flex" onClick={() => toggleModal(null)}></button>
      </div>
    </FocusTrap>
  );
}
