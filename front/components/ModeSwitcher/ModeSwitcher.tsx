"use client";

import { useEffect, useState } from "react";

import styles from "./ModeSwitcher.module.scss";

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
    <div className={styles.wrapper}>
      <button onClick={() => changeMode()} aria-label="switchMode">
        change mode
      </button>
    </div>
  );
}
