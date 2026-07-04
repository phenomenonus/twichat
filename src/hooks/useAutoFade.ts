import React from "react";

/**
 * Fades element in on trigger and fades out after delay.
 * If delayMs is 0 → auto-hide is disabled.
 */
export const useAutoFade = <TElement extends HTMLElement, TTrigger>(
  ref: React.RefObject<TElement>,
  trigger: TTrigger,
  delayMs: number,
) => {
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || delayMs === 0) return;

    el.style.opacity = "1";
    el.style.transition = "opacity 1s ease";

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      const current = ref.current;
      if (!current) return;

      current.style.opacity = "0";
    }, delayMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [ref, trigger, delayMs]);
};
