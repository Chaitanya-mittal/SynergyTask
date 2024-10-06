import { useEffect, useRef, RefObject } from "react";

function useOutsideClick(handler: () => void, capturingPhase: boolean = true): { myRef: RefObject<HTMLElement> } {
  const myRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (myRef.current && !myRef.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside, capturingPhase);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, capturingPhase);
    };
  }, [handler, capturingPhase]);

  return { myRef };
}

export default useOutsideClick;