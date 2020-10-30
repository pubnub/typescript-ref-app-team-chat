import Styled, { css } from "styled-components/macro";

export enum InputVariants {
  DARK = "dark"
}

export interface InputProps {
  /** Specify a Input variant */
  variant?: InputVariants | false;
  /** Add an attribution background */
  attribution?: string | false;
}

const DarkInput = css`
  background: ${p => p.theme.backgrounds.content};
  border: ${p => p.theme.borders.light};
`;

const AttributionInput = css<InputProps>`
  background-image: url(${p => p.attribution});
  background-position: center right;
  background-repeat: no-repeat;
  background-size: auto 18px;
`;

export const Input = Styled.input<InputProps>`
  border: ${({ theme }) => theme.borders.dark};
  border-radius: ${p => p.theme.radii.light};
  color: ${p => p.theme.colors.importantText};
  height: 42px;
  padding: ${p => p.theme.space[3]};
  width: 100%;

  &[type="password"] {
    font-size: ${p => p.theme.fontSizes.huge};
    letter-spacing: 8px;
  }

  &:focus {
    outline: none;
  }

  ${props => props.variant === InputVariants.DARK && DarkInput}
  ${props => props.attribution && AttributionInput}
`;
