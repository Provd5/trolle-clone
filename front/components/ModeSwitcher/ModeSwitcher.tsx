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
    isModeLoaded && (
      <div className="grid grid-cols-3 gap-1">
        {Colors.map((color) => (
          <button
            key={color}
            onClick={() => changeMode(color)}
            className="h-10 w-10 rounded hover:opacity-75 md:h-16 md:w-16"
            style={{
              background: `linear-gradient(45deg, var(--${color}-1), var(--${color}-2))`,
            }}
          />
        ))}
      </div>
    )
  );
}
