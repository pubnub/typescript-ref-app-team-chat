import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import getUniqueColor from "foundations/utilities/getUniqueColor";

export const Wrapper = styled.div<{ color: string; size: number }>`
  vertical-align: middle;
  border-radius: ${({ theme }) => theme.radii.round};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  line-height: ${props => props.size}px;
  font-size: ${props => Math.round(props.size / 3)}px;
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.avatarText};
  background-color: ${props => props.color};
`;

type UserInitialsAvatarProps = {
  name: string;
  userId: string;
  size: number;
  muted?: boolean;
  color?: string;
};

const UserInitialsAvatar = ({
  name,
  userId,
  size,
  muted,
  color
}: UserInitialsAvatarProps) => {
  const theme = useContext(ThemeContext);
  const initials = name.match(/\b\w/g) || [];
  const uniqueColor = getUniqueColor(
    userId,
    (theme.colors.avatars as unknown) as string[]
  );
  return (
    <Wrapper size={size} color={color || uniqueColor}>
      {initials}
    </Wrapper>
  );
};

export { UserInitialsAvatar };
