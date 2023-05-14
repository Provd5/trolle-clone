"use client";

import { useRef, useState } from "react";
import { BiColumns } from "react-icons/bi";
import { MdOutlineColorLens } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import FocusTrap from "focus-trap-react";
import LogoImage from "public/android-chrome-512x512.png";

import { useClickOutside } from "hooks/useClickOutside";

import BoardsModal from "components/Modals/BoardsModal";
import ModeSwitcher from "components/Modals/ModeSwitcher";

export type ModalsType = null | "ColorsModal" | "BoardsModal";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<ModalsType>(null);

  useClickOutside(modalRef, toggleModal, null);

  function toggleModal(modalName: ModalsType) {
    activeModal === modalName
      ? setActiveModal(null)
      : setActiveModal(modalName);
  }

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between bg-current-1 px-1 py-0.5 md:px-2 md:py-1">
        <button onClick={() => toggleModal("BoardsModal")} className="btn-icon">
          <BiColumns className="icon" />
        </button>
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            alt="Projekt T.U.T.E.L Logo"
            src={LogoImage}
            className="h-6 w-6 md:h-8 md:w-8"
          />
          <h1 className="text-xl font-bold uppercase md:text-2xl">t.u.t.e.l</h1>
        </Link>
        <button onClick={() => toggleModal("ColorsModal")} className="btn-icon">
          <MdOutlineColorLens className="icon" />
        </button>
      </nav>
      <main className="relative flex grow flex-col md:flex-row">
        {children}

        {activeModal && (
          <FocusTrap>
            <div ref={modalRef}>
              {activeModal === "ColorsModal" && (
                <div className="modal right-0 top-0">
                  <ModeSwitcher />
                </div>
              )}
              {activeModal === "BoardsModal" && (
                <div className="modal left-0 top-0">
                  <BoardsModal toggleModal={toggleModal} />
                </div>
              )}
              <button className="flex" onClick={() => toggleModal(null)} />
            </div>
          </FocusTrap>
        )}
      </main>
    </>
  );
}
