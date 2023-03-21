import { useEffect } from "react";

export const useDragScrollVertical = (
  ref: React.RefObject<HTMLDivElement>,
  stopScrolling: boolean
) => {
  useEffect(() => {
    let isDown = false;
    let startY: number;
    let scrollTop: number;
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
        startY = e.pageY - el.offsetTop;
        scrollTop = el.scrollTop;
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (isDown && el && !stopScrolling) {
        e.preventDefault();
        const x = e.pageY - el.offsetTop;
        const walk = (x - startY) * 3;
        el.scrollTop = scrollTop - walk;
      }
    }

    function handleTouchStart(e: TouchEvent) {
      if (el && !stopScrolling) {
        isDown = true;
        const touch = e.touches[0];
        startY = touch.pageY - el.offsetTop;
        scrollTop = el.scrollTop;
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (isDown && el && !stopScrolling) {
        e.preventDefault();
        const touch = e.touches[0];
        const x = touch.pageY - el.offsetTop;
        const walk = (x - startY) * 3;
        el.scrollTop = scrollTop - walk;
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
