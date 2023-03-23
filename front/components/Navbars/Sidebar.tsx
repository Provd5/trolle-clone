import { FiMenu } from "react-icons/fi";

export default function Sidebar() {
  return (
    <section className="bg-gradient border-default flex min-h-[40px] w-auto items-center justify-between border-0 py-2 px-3 md:h-auto md:w-24 md:flex-col md:border-r md:px-1 md:py-6">
      <div className="flex items-center justify-center gap-1">
        <button className="btn-icon md:hidden">
          <FiMenu />
        </button>
        Tablice
      </div>
    </section>
  );
}
