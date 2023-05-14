"use client";

import { useEffect, useState } from "react";

const Colors = [
  { color: "light", emoji: "🌫️" },
  { color: "dark", emoji: "🦇" },
  { color: "blue", emoji: "☄️" },
  { color: "green", emoji: "🌊" },
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

  function changeMode(color: ColorType["color"]) {
    document.documentElement.className = color;
    window.localStorage.setItem("mode", color);
  }

  return (
    <>
      {isModeLoaded && (
        <div className="grid grid-cols-2 gap-1">
          {Colors.map((item) => (
            <button
              key={item.color}
              onClick={() => changeMode(item.color)}
              className="flex h-10 w-10 items-center justify-center rounded p-1 hover:opacity-75 md:h-16 md:w-16 md:items-end md:justify-end"
              style={{
                background: `var(--${item.color}-gradient)`,
              }}
            >
              {item.emoji}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
