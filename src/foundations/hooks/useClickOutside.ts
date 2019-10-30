import { useEffect, useCallback, RefObject } from "react";

const isRefArray = (
  r: RefObject<any> | RefObject<any>[]
): r is RefObject<any>[] => {
  return "length" in r;
};

const isTarget = (ref: RefObject<any>, event: MouseEvent) => {
  return ref && ref.current && ref.current.contains(event.target);
};

const trueForAny = (array: any[], condition: (props: any) => boolean) => {
  return array.reduce((conditionAlreadyMet, value) => {
    return conditionAlreadyMet || condition(value);
  }, false);
};

const useClickOutside = (
  ref: RefObject<any> | RefObject<any>[],
  onclick: () => void
) => {
  const handleClick = useCallback(
    (click: MouseEvent) => {
      if (isRefArray(ref)) {
        if (trueForAny(ref, (ref: RefObject<any>) => isTarget(ref, click))) {
          return;
        }
      } else {
        if (isTarget(ref, click)) {
          return;
        }
      }
      onclick();
    },
    [onclick, ref]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return ref;
};

export default useClickOutside;
