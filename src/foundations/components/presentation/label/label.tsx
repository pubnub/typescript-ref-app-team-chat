import Styled, { css } from "styled-components/macro";

export enum LabelVariants {
  INVERSE = "inverse",
  ACTIVE = "active",
  DARK = "dark"
}

export enum LabelSizes {
  SMALL = "small"
}

export interface LabelProps {
  /** Specify a Label variant */
  variant?: LabelVariants | false;
  /** Specify a Label size */
  size?: LabelSizes | false;
}

const InverseLabel = css`
  color: ${p => p.theme.colors.onPrimary};
`;

const ActiveLabel = css`
  color: ${p => p.theme.colors.active};
`;

const DarkLabel = css`
  color: ${p => p.theme.colors.importantText};
`;

const SmallLabel = css`
  font-size: ${p => p.theme.fontSizes.small};
`;

const Label = Styled.span<LabelProps>`
  color: ${p => p.theme.colors.normalText};
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;

  ${props => props.variant === LabelVariants.INVERSE && InverseLabel}
  ${props => props.variant === LabelVariants.ACTIVE && ActiveLabel}
  ${props => props.variant === LabelVariants.DARK && DarkLabel}
  ${props => props.size === LabelSizes.SMALL && SmallLabel}
`;

export { Label };
