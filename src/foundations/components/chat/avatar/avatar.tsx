import Styled, { css } from "styled-components/macro";
import { color, ColorProps } from "styled-system";

export enum AvatarVariants {
  ROUND = "round"
}

interface AvatarProps extends ColorProps {
  /** Specify an Avatar variant */
  variant?: AvatarVariants | false;
}

const RoundAvatar = css`
  border-radius: ${p => p.theme.radii.round};
`;

export const Avatar = Styled.div<AvatarProps>`
  align-items: center;
  background: ${p => p.theme.colors.avatars[0]};
  border-radius: ${p => p.theme.radii.medium};
  color: ${p => p.theme.colors.onPrimary};
  display: flex;
  flex-shrink: 0;
  font-size: ${p => p.theme.fontSizes.card};
  height: 36px;
  justify-content: center;
  line-height: ${p => p.theme.fontSizes.card};
  text-transform: uppercase;
  width: 36px;

  ${color}
  ${props => props.variant === AvatarVariants.ROUND && RoundAvatar}
`;
