import Styled from "styled-components/macro";
import { flexbox, FlexboxProps, layout, LayoutProps } from "styled-system";
import { StyledBox } from "foundations/components/layout";

export const FlexRow = Styled(StyledBox)<FlexboxProps & LayoutProps>`
  display: flex;
  align-items: center;

  ${flexbox}
  ${layout}
`;
