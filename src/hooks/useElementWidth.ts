import { useState, useEffect, RefObject, useRef } from "react";

const useElementWidth = <T extends HTMLElement>(): [
  number | null,
  RefObject<T>
] => {
  const [elementWidth, setElementWidth] = useState<number | null>(null);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const handleResize = () => {
      if (elementRef.current) {
        setElementWidth(elementRef.current.offsetWidth);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [elementRef]);

  return [elementWidth, elementRef];
};

export default useElementWidth;
