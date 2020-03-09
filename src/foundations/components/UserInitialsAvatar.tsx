import React from "react";
import styled from "styled-components/macro";
import getUniqueColor from "foundations/utilities/getUniqueColor";
import { setLightness } from "polished";

export const Wrapper = styled.div<{ color: string; size: number }>`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  border-radius: 50%;
  text-align: center;
  color: white;
  text-transform: uppercase;
  vertical-align: middle;
  background-color: ${props => props.color};
  width: ${props => props.size}px;
  font-size: ${props => Math.round(props.size / 3)}px;
  height: ${props => props.size}px;
  line-height: ${props => props.size}px;
`;

const colorSet = [
  "#FFAB91",
  "#80DEEA",
  "#EF9A9A",
  "#CE93D8",
  "#AED581",
  "#9FA7DF",
  "#BCAAA4",
  "#FFE082",
  "#F48FB1",
  "#DCE775"
];

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
  const initials = name.match(/\b\w/g) || [];
  const uniqueColor = getUniqueColor(userId, colorSet);
  const processedColor = muted ? setLightness(0.9, uniqueColor) : uniqueColor;
  return (
    <Wrapper size={size} color={color || processedColor}>
      {initials}
    </Wrapper>
  );
};

export { UserInitialsAvatar };
