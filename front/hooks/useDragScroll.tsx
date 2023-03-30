import { RefObject, useEffect } from "react";

export const useDragScroll = (
  scrollRef: RefObject<HTMLDivElement>,
  stopScrolling = false,
  allowDrag = false
) => {
  useEffect(() => {
    let isDown = false;
    let startX: number;
    let startY: number;
    let scrollLeft: number;
    let scrollTop: number;
    const el = scrollRef.current;

    if (!el) {
      return;
    }

    function handleUp() {
      isDown = false;
    }

    function handleMouseDown(e: MouseEvent) {
      if (el && !stopScrolling && allowDrag) {
        isDown = true;
        startX = e.pageX - el.offsetLeft;
        startY = e.pageY - el.offsetTop;
        scrollLeft = el.scrollLeft;
        scrollTop = el.scrollTop;
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (isDown && el && !stopScrolling && allowDrag) {
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const y = e.pageY - el.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        let isX = walkX;
        let isY = walkY;
        if (walkX < 0) isX = walkX * -1;
        if (walkY < 0) isY = walkY * -1;
        isX > isY
          ? (el.scrollLeft = scrollLeft - walkX)
          : (el.scrollTop = scrollTop - walkY);
      }
    }

    function handleTouchStart(e: TouchEvent) {
      if (el && !stopScrolling) {
        isDown = true;
        const touch = e.touches[0];
        startX = touch.pageX - el.offsetLeft;
        startY = touch.pageY - el.offsetTop;
        scrollLeft = el.scrollLeft;
        scrollTop = el.scrollTop;
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (isDown && el && !stopScrolling) {
        e.preventDefault();
        const touch = e.touches[0];
        const x = touch.pageX - el.offsetLeft;
        const y = touch.pageY - el.offsetTop;
        const walkX = (x - startX) * 3;
        const walkY = (y - startY) * 3;
        let isX = walkX;
        let isY = walkY;
        if (walkX < 0) isX = walkX * -1;
        if (walkY < 0) isY = walkY * -1;
        isX > isY
          ? (el.scrollLeft = scrollLeft - walkX)
          : (el.scrollTop = scrollTop - walkY);
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
