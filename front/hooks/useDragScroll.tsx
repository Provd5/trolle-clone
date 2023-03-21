import { useEffect } from "react";

export const useDragScroll = (
  ref: React.RefObject<HTMLDivElement>,
  stopScrolling: boolean
) => {
  useEffect(() => {
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    const el = ref.current;

    if (!el) {
      return;
    }

    function handleUp() {
      isDown = false;
    }

    function handleMouseDown(e: MouseEvent) {
      if (el && !stopScrolling) {
        isDown = true;
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (isDown && el && !stopScrolling) {
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 2;
        el.scrollLeft = scrollLeft - walk;
      }
    }

    function handleTouchStart(e: TouchEvent) {
      if (el && !stopScrolling) {
        isDown = true;
        const touch = e.touches[0];
        startX = touch.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (isDown && el && !stopScrolling) {
        e.preventDefault();
        const touch = e.touches[0];
        const x = touch.pageX - el.offsetLeft;
        const walk = (x - startX) * 2;
        el.scrollLeft = scrollLeft - walk;
      }
    }

    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseup", handleUp);
    el.addEventListener("mouseleave", handleUp);

    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleUp);
    el.addEventListener("touchcancel", handleUp);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseup", handleUp);
      el.removeEventListener("mouseleave", handleUp);

      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleUp);
      el.removeEventListener("touchcancel", handleUp);
    };
  });
};
