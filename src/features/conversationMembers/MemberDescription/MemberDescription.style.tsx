import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.sizes[2]};
  padding: ${({ theme }) => `${theme.space[0]} ${theme.space[6]}`};
  :hover {
    background: ${({ theme }) => theme.backgrounds.panelHover};
  }
`;

export const PresenceDot = styled.div<{ presence: boolean; size: number }>`
  border-radius: ${({ theme }) => theme.radii.round};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  top: -${({ size }) => size / 2}px;
  right: -${({ size }) => size / 2}px;
  position: absolute;
  background-color: ${({ theme, presence }) =>
    presence ? theme.colors.success : theme.colors.inactive};
  font-size: 0px;
`;

export const Avatar = styled.div`
  width: ${({ theme }) => theme.sizes[1]};
  height: ${({ theme }) => theme.sizes[1]};
  position: relative;
`;

export const About = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.space[6]};
  height: ${({ theme }) => theme.sizes[1]};
`;

export const UserName = styled.div<{ muted: boolean }>`
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.importantText};
`;

export const UserTitle = styled.div<{ muted: boolean }>`
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: ${({ theme }) => theme.colors.normalText};
`;
