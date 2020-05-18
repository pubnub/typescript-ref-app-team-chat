import styled from "styled-components/macro";
import image from "./background.png";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.medium} {
    background: url(${image});
    background-size: cover;
    background-position: center center;
    padding: 10% 15%;
  }
`;

export const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;

export const Promo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(
    180deg,
    rgba(240, 42, 42, 0.670214) 0%,
    rgba(138, 42, 225, 0.55153) 100%
  );
  max-width: 360px;
  border-top-left-radius: ${({ theme }) => theme.radii.strong};
  border-bottom-left-radius: ${({ theme }) => theme.radii.strong};
  display: none;

  ${({ theme }) => theme.mediaQueries.large} {
    display: flex;
  }
`;

export const TagLine = styled.h1`
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  margin: 0px;
  text-align: center;
  padding: 20px 50px;
`;

export const Screenshot = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  background: ${({ theme }) => theme.backgrounds.panel};
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: ${({ theme }) => theme.radii.strong};
  border-bottom-right-radius: ${({ theme }) => theme.radii.strong};
  border-top-left-radius: ${({ theme }) => theme.radii.strong};
  border-bottom-left-radius: ${({ theme }) => theme.radii.strong};
  background: ${({ theme }) => theme.backgrounds.content};

  ${({ theme }) => theme.mediaQueries.large} {
    border-top-left-radius: ${({ theme }) => theme.radii.square};
    border-bottom-left-radius: ${({ theme }) => theme.radii.square};
  }
`;

export const LoginForm = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.app};
`;

export const Logo = styled.img`
  height: 30px;
`;

export const Label = styled.div`
  color: ${({ theme }) => theme.colors.importantText};
  padding-bottom: ${({ theme }) => theme.space[1]};
  padding-top: ${({ theme }) => theme.space[6]};
`;

export const Field = styled.input`
  height: 42px;
  color: ${({ theme }) => theme.colors.importantText};
  border-radius: ${({ theme }) => theme.radii.light};
  border: ${({ theme }) =>
    `${theme.borders.light} ${theme.colors.borderLight}`};
  padding: ${({ theme }) => `0 ${theme.space[3]}`};
  background: ${({ theme }) => theme.backgrounds.content};

  &[type="password"] {
    letter-spacing: 8px;
    font-size: 24px;
  }

  :read-only:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  align-self: center;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.light};
  border: ${({ theme }) => theme.borders.none};
  margin-top: ${({ theme }) => theme.space[8]};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[0]}`};
  width: 100%;
  height: 42px;
  color: ${({ theme }) => theme.colors.activeText};
  background: linear-gradient(155deg, #e12a66 0%, #5c0ce1 100%);
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  &:focus {
    outline: none;
  }
`;
