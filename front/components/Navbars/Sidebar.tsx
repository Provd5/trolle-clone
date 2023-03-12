import { FiMenu } from "react-icons/fi";

export default function Sidebar() {
  return (
    <section className="flex w-auto flex-none items-center justify-between bg-neutral-300 py-2 px-3 dark:bg-neutral-700 md:h-auto md:w-24 md:flex-col md:px-1 md:py-6">
      <div className="flex items-center justify-center gap-1">
        <button className="btnIcon md:hidden">
          <FiMenu />
        </button>
        Tablice
      </div>
    </section>
  );
}
