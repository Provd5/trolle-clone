"use client";

import { useEffect, useState } from "react";

export default function ModeSwitcher() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.contains("light") && setMode("dark");
  }, []);

  function changeMode() {
    if (mode !== "dark") {
      setMode("dark");
      document.documentElement.className = mode;
      window.localStorage.setItem("mode", mode);
    }
    if (mode !== "light") {
      setMode("light");
      document.documentElement.className = mode;
      window.localStorage.setItem("mode", mode);
    }
  }

  return (
    <div className="fixed z-99 top-2 md:top-auto right-2 md:right-3 bottom-auto md:bottom-3">
      <button onClick={() => changeMode()} aria-label="switchMode">
        change mode
      </button>
    </div>
  );
}
