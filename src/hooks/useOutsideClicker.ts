import * as React from "react";

export const useOutsideClicker = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void
) => {
  const handleClick = (e:MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
