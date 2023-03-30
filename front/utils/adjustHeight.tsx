import { RefObject } from "react";

export function adjustHeight(ref: RefObject<HTMLTextAreaElement>) {
  const el = ref.current;
  if (!el) return;

  el.style.overflowY = el.scrollHeight > 160 ? "scroll" : "hidden";
  el.style.height = "34px";
  el.style.height = `${el.scrollHeight}px`;
}
