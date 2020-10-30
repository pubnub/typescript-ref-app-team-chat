import Styled from "styled-components/macro";
import { layout, LayoutProps } from "styled-system";

export const ScrollView = Styled.div<LayoutProps>`
  height: 100%;
  overflow-y: auto;

  ${layout}
`;
