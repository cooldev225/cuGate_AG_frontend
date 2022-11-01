import { useState, useEffect } from "react";

export const useMenuPosition = (
  ref: React.MutableRefObject<HTMLElement | null>,
  directory: "vertical" | "horizontal",
  maxHeight = 300
): MenuPositionType => {
  const [state, setState] = useState<MenuPositionType>({});
  useEffect(() => {
    const getMenuPosition = (): void => {
      const { top, left, right, bottom } = ref.current?.getBoundingClientRect()
        ? ref.current?.getBoundingClientRect()
        : {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          };
      const position: MenuPositionType = {};
      position.width = right - left;
      position.left = left;
      if (window.innerHeight - bottom < maxHeight) {
        position.bottom = window.innerHeight - top + 2;
      } else {
        position.top = bottom + 2;
      }

      setState(position);
    };
    getMenuPosition();
    window.addEventListener("scroll", getMenuPosition);
    window.addEventListener("resize", getMenuPosition);
    ref && ref.current?.addEventListener("mouseenter", getMenuPosition);
    return () => {
      window.removeEventListener("scroll", getMenuPosition);
      window.removeEventListener("resize", getMenuPosition);
    };
  }, []);

  return state;
};
