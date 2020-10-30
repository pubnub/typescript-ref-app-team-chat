import Styled, { css } from "styled-components/macro";
import { typography, TypographyProps } from "styled-system";

export enum HeadingVariants {
  INVERSE = "inverse"
}

export enum HeadingSizes {
  BIG = "big",
  HUGE = "huge"
}

export interface HeadingProps extends TypographyProps {
  /** Specify a Heading variant */
  variant?: HeadingVariants | false;
  /** Specify a Heading size */
  size?: HeadingSizes | false;
}

const InverseHeading = css`
  color: ${p => p.theme.colors.onPrimary};
`;

const BigHeading = css`
  font-size: ${p => p.theme.fontSizes.large};
  font-weight: ${p => p.theme.fontWeights.bold};
`;

const HugeHeading = css`
  font-size: ${p => p.theme.fontSizes.huge};
  font-weight: ${p => p.theme.fontWeights.light};
`;

export const Heading = Styled.h3<HeadingProps>`
  color: inherit;
  font-family: inherit;
  font-size: ${p => p.theme.fontSizes.medium};
  font-weight: ${p => p.theme.fontWeights.medium};

  ${props => props.variant === HeadingVariants.INVERSE && InverseHeading}
  ${props => props.size === HeadingSizes.BIG && BigHeading}
  ${props => props.size === HeadingSizes.HUGE && HugeHeading}

  ${typography}
`;
