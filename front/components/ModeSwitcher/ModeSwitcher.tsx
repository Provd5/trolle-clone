"use client";

import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

export default function ModeSwitcher() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [isModeLoaded, setIsModeLoaded] = useState(false);

  useEffect(() => {
    document.documentElement.classList.contains("light") && setMode("dark");
    setIsModeLoaded(true);
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
    isModeLoaded && (
      <button
        onClick={() => changeMode()}
        aria-label="switchMode"
        className="btnIcon"
      >
        {mode === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
      </button>
    )
  );
}
