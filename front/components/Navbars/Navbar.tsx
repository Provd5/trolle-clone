"use client";

import { useState } from "react";
import { MdOutlineColorLens } from "react-icons/md";

import ModeSwitcher from "components/ModeSwitcher/ModeSwitcher";

import NavbarModalsWrapper from "./NavbarModalsWrapper";

export type ModalsType = null | "ColorsModal" | "TestModal";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalsType>(null);

  function toggleModal(modalName: ModalsType) {
    activeModal === modalName
      ? setActiveModal(null)
      : setActiveModal(modalName);
  }

  return (
    <>
      <nav className="gradient-dir-2 border-default flex min-h-[40px] flex-wrap items-center justify-between border-b py-2 px-3 md:py-1">
        wyszukiwarka czy coś
        <div className="flex gap-3">
          <button
            onClick={() => toggleModal("ColorsModal")}
            className="btn-icon"
          >
            <MdOutlineColorLens className="h-3/5 w-3/5" />
          </button>
          <button onClick={() => toggleModal("TestModal")}>test</button>
        </div>
      </nav>
      <main className="relative flex flex-none grow flex-col md:flex-row">
        {children}

        {activeModal && (
          <NavbarModalsWrapper toggleModal={toggleModal}>
            {activeModal === "ColorsModal" && <ModeSwitcher />}
            {activeModal === "TestModal" && <div></div>}
          </NavbarModalsWrapper>
        )}
      </main>
    </>
  );
}
