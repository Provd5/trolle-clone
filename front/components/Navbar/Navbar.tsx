"use client";

import { useRef, useState } from "react";
import { BiColumns } from "react-icons/bi";
import { MdOutlineColorLens } from "react-icons/md";
import FocusTrap from "focus-trap-react";
import { motion } from "framer-motion";

import { useClickOutside } from "hooks/useClickOutside";

import { ButtonIcon } from "components/atoms/ButtonIcon";
import { Logo } from "components/atoms/Logo";
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
        <ButtonIcon
          color="defaultColor"
          Icon={BiColumns}
          iconSize="icon"
          onClick={() => toggleModal("BoardsModal")}
        />
        <Logo />
        <ButtonIcon
          color="defaultColor"
          Icon={MdOutlineColorLens}
          iconSize="icon"
          onClick={() => toggleModal("ColorsModal")}
        />
      </nav>
      <main className="relative flex grow flex-col md:flex-row">
        {activeModal && (
          <FocusTrap>
            <div ref={modalRef}>
              {activeModal === "ColorsModal" && (
                <motion.div
                  className="modal right-0 top-0"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <ModeSwitcher />
                </motion.div>
              )}
              {activeModal === "BoardsModal" && (
                <motion.div
                  className="modal left-0 top-0"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <BoardsModal toggleModal={toggleModal} />
                </motion.div>
              )}
              <button className="flex" onClick={() => toggleModal(null)} />
            </div>
          </FocusTrap>
        )}
        {children}
      </main>
    </>
  );
}
