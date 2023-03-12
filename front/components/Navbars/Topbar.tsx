import ModeSwitcher from "components/ModeSwitcher/ModeSwitcher";

export default function Topbar() {
  return (
    <nav className="flex items-center justify-between bg-neutral-300 py-2 px-3 dark:bg-neutral-700 md:py-1">
      wyszukiwarka czy coś
      <ModeSwitcher />
    </nav>
  );
}
