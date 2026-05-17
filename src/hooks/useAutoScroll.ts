import React from "react";

/**
 * Auto-scroll hook for a scrollable container.
 * Scrolls to the bottom whenever `trigger` changes,
 * unless the user manually scrolled up.
 *
 * @param ref Ref to the scrollable container
 * @param trigger Value to trigger scroll (e.g., array, last message id)
 */
export const useAutoScroll = <TElement extends HTMLElement, TTrigger>(
  ref: React.RefObject<TElement>,
  trigger: TTrigger,
) => {
  const autoRef = React.useRef(true);

  React.useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const onScroll = () => {
      autoRef.current = element.scrollHeight - element.scrollTop - element.clientHeight <= 20;
    };

    element.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      element.removeEventListener("scroll", onScroll);
    };
  }, [ref]);

  React.useLayoutEffect(() => {
    const element = ref.current;

    if (!element || !autoRef.current) return;

    element.scrollTop = element.scrollHeight;
  }, [ref, trigger]);
};
