import styled from "styled-components/macro";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${({ theme }) => theme.sizes[3]};
  justify-content: space-between;
  background: ${({ theme }) => theme.backgrounds.panel};
  padding: ${({ theme }) => `${theme.space[7]} ${theme.space[6]}`};
  padding-bottom: 0px;
  ${({ theme }) => theme.mediaQueries.medium} {
    background: transparent;
  }
`;

export const BackIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  margin-right: ${({ theme }) => theme.space[7]};
  ${({ theme }) => theme.mediaQueries.medium} {
    display: none;
  }
`;

export const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.sizes[1]};
  width: 100%;
`;

export const Border = styled.div`
  display: none;
  border-bottom: ${({ theme }) =>
    `${theme.borders.light} ${theme.colors.neutral[2]}`};
  ${({ theme }) => theme.mediaQueries.medium} {
    display: inherit;
  }
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Name = styled.div`
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.importantText};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: capitalize;
`;

export const Description = styled.div`
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.normalText};
  font-size: ${({ theme }) => theme.fontSizes.regular};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  text-transform: capitalize;
`;
