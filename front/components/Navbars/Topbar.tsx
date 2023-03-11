import ModeSwitcher from "components/ModeSwitcher/ModeSwitcher";

export default function Topbar() {
  return (
    <nav className="flex h-8 items-center justify-between bg-neutral-300 py-0 px-3 dark:bg-neutral-700">
      wyszukiwarka czy coś
      <ModeSwitcher />
    </nav>
  );
}
