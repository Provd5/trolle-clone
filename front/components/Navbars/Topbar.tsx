import ModeSwitcher from "components/ModeSwitcher/ModeSwitcher";

export default function Topbar() {
  return (
    <nav className="bg-gradient-tr border-default flex min-h-[40px] flex-wrap items-center justify-between border-b py-2 px-3 md:py-1">
      wyszukiwarka czy coś
      <ModeSwitcher />
    </nav>
  );
}
