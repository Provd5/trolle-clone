"use client";

import { useEffect, useState } from "react";

const Colors = [
  "light",
  "dark",
  "rose",
  "fuchsia",
  "blue",
  "cyan",
  "green",
  "lime",
  "amber",
] as const;

type ColorType = (typeof Colors)[number];

export default function ModeSwitcher() {
  const [isModeLoaded, setIsModeLoaded] = useState(false);

  useEffect(() => {
    (document.documentElement.classList.contains("light") &&
      window.localStorage.setItem("mode", "light")) ||
      (document.documentElement.classList.contains("dark") &&
        window.localStorage.setItem("mode", "dark"));
    setIsModeLoaded(true);
  }, []);

  function changeMode(color: ColorType) {
    document.documentElement.className = color;
    window.localStorage.setItem("mode", color);
  }

  return (
    <div className="flex flex-wrap gap-3">
      {isModeLoaded && (
        <>
          {Colors.map((color) => (
            <div key={color} onClick={() => changeMode(color)}>
              {color}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
