import styled from "styled-components/macro";

export const Wrapper = styled.div`
  flex-grow: 1;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: auto;
`;

export const TextArea = styled.textarea`
  flex-grow: 1;
  resize: none;
  overflow: auto;
  border: ${({ theme }) => theme.borders.none};
  max-height: ${({ theme }) => theme.sizes[4]};
  padding: ${({ theme }) => theme.space[0]};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.importantText};
  background: ${({ theme }) => theme.backgrounds.content};
  &::placeholder {
    color: ${({ theme }) => theme.colors.normalText};
  }
  &:focus {
    outline: none;
  }
`;

export const SendButton = styled.div`
  align-self: flex-end;
  display: none;
  padding: ${({ theme }) => theme.space[1]};
  margin: ${({ theme }) => `-${theme.space[1]}`};
  margin-left: ${({ theme }) => theme.space[1]};
  border-radius: ${({ theme }) => theme.radii.light};
  background-color: ${({ theme }) => theme.colors.primary[0]};
  ${({ theme }) => theme.mediaQueries.touch} {
    display: flex;
  }
`;
