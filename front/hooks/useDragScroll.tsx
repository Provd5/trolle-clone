// import { useEffect } from "react";

// export const useDragScroll = (
//   ref: React.RefObject<HTMLDivElement>,
//   stopScrolling: boolean
// ) => {
//   useEffect(() => {
//     let isDown = false;
//     let startX: number;
//     let scrollLeft: number;
//     const el = ref.current;

//     if (!el) {
//       return;
//     }

//     function handleUp() {
//       isDown = false;
//     }

//     function handleDown(e: MouseEvent | TouchEvent, isTouch: boolean) {
//       if (el && !stopScrolling) {
//         isDown = true;
//         const touchOrMouseEvent = isTouch
//           ? (e as TouchEvent).touches[0]
//           : (e as MouseEvent);
//         startX = touchOrMouseEvent.pageX - el.offsetLeft;
//         scrollLeft = el.scrollLeft;
//       }
//     }

//     function handleMove(e: MouseEvent | TouchEvent, isTouch: boolean) {
//       if (isDown && el && !stopScrolling) {
//         e.preventDefault();
//         const touchOrMouseEvent = isTouch
//           ? (e as TouchEvent).touches[0]
//           : (e as MouseEvent);
//         const x = touchOrMouseEvent.pageX - el.offsetLeft;
//         const walk = (x - startX) * 1;
//         el.scrollLeft = scrollLeft - walk;
//       }
//     }

//     //prettier-ignore
//     const addEvents = (isTouch: boolean) => {
//       el.addEventListener(isTouch ? "touchmove" : "mousemove", (e) => handleMove(e, isTouch));
//       el.addEventListener(isTouch ? "touchstart" : "mousedown", (e) => handleDown(e, isTouch));
//       el.addEventListener(isTouch ? "touchend" : "mouseup", () => handleUp());
//       el.addEventListener(isTouch ? "touchcancel" : "mouseleave", () => handleUp());
//     };

//     //prettier-ignore
//     const removeEvents = (isTouch: boolean) => {
//       el.removeEventListener(isTouch ? "touchmove" : "mousemove", (e) => handleMove(e, isTouch));
//       el.removeEventListener(isTouch ? "touchstart" : "mousedown", (e) => handleDown(e, isTouch));
//       el.removeEventListener(isTouch ? "touchend" : "mouseup", () => handleUp());
//       el.removeEventListener(isTouch ? "touchcancel" : "mouseleave", () => handleUp());
//     };

//     addEvents(false);
//     addEvents(true);

//     return () => {
//       removeEvents(false);
//       removeEvents(true);
//     };
//   });
// };

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

    function handleMouseDown(e: MouseEvent) {
      if (el && !stopScrolling) {
        isDown = true;
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      }
    }

    function handleMouseUp() {
      isDown = false;
    }

    function handleMouseMove(e: MouseEvent) {
      if (isDown && el && !stopScrolling) {
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 1;
        el.scrollLeft = scrollLeft - walk;
      }
    }

    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  });
};
