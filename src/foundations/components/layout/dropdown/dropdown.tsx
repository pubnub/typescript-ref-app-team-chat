import React, {
  ReactNode,
  FunctionComponent,
  useState,
  useCallback,
  useRef
} from "react";
import useClickOutside from "foundations/hooks/useClickOutside";
import { Icon, Icons } from "foundations/components/presentation";
import { StyledBox } from "foundations/components/layout";

interface DropdownProps {
  /** Icon name to display as open button */
  icon: Icons;
  /** Title for the Icon */
  title: string;
  /** Top position of the Dropdown */
  top?: string | number;
  /** Bottom position of the Dropdown */
  bottom?: string | number;
  /** Left position of the Dropdown */
  left?: string | number;
  /** Right position of the Dropdown */
  right?: string | number;
  /** Function prop for Dropdown content */
  render: (dismiss: () => void) => ReactNode;
}

export const Dropdown: FunctionComponent<DropdownProps> = ({
  icon,
  render,
  top,
  bottom,
  left,
  right,
  title
}) => {
  const [showDropdown, setDropdownState] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  const dismissDropdown = useCallback(() => {
    setDropdownState(false);
  }, [setDropdownState]);

  useClickOutside([dropdown], dismissDropdown);

  const toggleDropdown = () => {
    setDropdownState(!showDropdown);
  };

  return (
    <div ref={dropdown}>
      <Icon onClick={toggleDropdown} icon={icon} title={title} clickable />
      <StyledBox
        position="absolute"
        zIndex={200}
        {...{ top, bottom, left, right }}
      >
        {showDropdown && render(dismissDropdown)}
      </StyledBox>
    </div>
  );
};
