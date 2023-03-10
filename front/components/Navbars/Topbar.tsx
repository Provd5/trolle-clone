import ModeSwitcher from "components/ModeSwitcher/ModeSwitcher";

export default function Topbar() {
  return (
    <div className="fixed flex h-8 w-screen items-center justify-between bg-neutral-300 py-0 px-3 dark:bg-neutral-700">
      wyszukiwarka czy coś
      <ModeSwitcher />
    </div>
  );
}
