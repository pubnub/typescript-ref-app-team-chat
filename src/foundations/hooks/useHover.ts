import { useState } from "react";

// https://github.com/andrewbranch/react-use-hover

export interface UseHoverOptions {
  mouseEnterDelayMS?: number;
  mouseLeaveDelayMS?: number;
}

export type HoverProps = Pick<
  React.HTMLAttributes<HTMLElement>,
  "onMouseEnter" | "onMouseLeave"
>;

export default function useHover({
  mouseEnterDelayMS = 200,
  mouseLeaveDelayMS = 0
}: UseHoverOptions = {}): [boolean, HoverProps] {
  const [isHovering, setIsHovering] = useState(false);
  let mouseEnterTimer: number | undefined;
  let mouseOutTimer: number | undefined;
  return [
    isHovering,
    {
      onMouseEnter: () => {
        clearTimeout(mouseOutTimer);
        mouseEnterTimer = setTimeout(
          () => setIsHovering(true),
          mouseEnterDelayMS
        );
      },
      onMouseLeave: () => {
        clearTimeout(mouseEnterTimer);
        mouseOutTimer = setTimeout(
          () => setIsHovering(false),
          mouseLeaveDelayMS
        );
      }
    }
  ];
}
