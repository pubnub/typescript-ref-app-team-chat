import Styled from "styled-components/macro";
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  color,
  ColorProps,
  background,
  BackgroundProps,
  border,
  BorderProps
} from "styled-system";

export const StyledBox = Styled.div<
  SpaceProps &
    LayoutProps &
    PositionProps &
    ColorProps &
    BackgroundProps &
    BorderProps
>`
  ${space}
  ${layout}
  ${position}
  ${color}
  ${background}
  ${border}
`;
