import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  white-space: pre-wrap;
  border-radius: ${({ theme }) => theme.radii.strong};
  border-top-left-radius: ${({ theme }) => theme.radii.square};
  width: fit-content;
  line-height: 1.5;
  font-size: ${({ theme }) => theme.fontSizes.card};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  text-align: left;
  background: ${({ theme }) => theme.backgrounds.message};
  box-shadow: ${({ theme }) => theme.shadows[0]};
  color: ${({ theme }) => theme.colors.messageText};
  padding: ${({ theme }) => `${theme.space[5]} ${theme.space[6]}`};

  ${({ theme }) => theme.mediaQueries.large} {
    flex-direction: row;
    padding: 0px;
  }
`;

export const Source = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.space[4]};
`;

export const Media = styled.div`
  min-height: 120px;
  max-height: 120px;
  height: 120px;
  min-width: 210px;
  max-width: 210px;
  margin-top: ${({ theme }) => theme.space[1]};

  ${({ theme }) => theme.mediaQueries.large} {
    margin-top: 0px;
  }
`;

export const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: ${({ theme }) => theme.radii.strong};

  ${({ theme }) => theme.mediaQueries.large} {
    border-radius: 0px;
    border-bottom-left-radius ${({ theme }) => theme.radii.strong};
  }
`;

export const About = styled.div`
  max-width: 600px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.large} {
    padding: ${({ theme }) => `${theme.space[5]} ${theme.space[6]}`};
  }
`;

export const Title = styled.a`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.active};
  text-decoration: none;
`;

export const Description = styled.div`
  color: ${({ theme }) => theme.colors.normalText};
`;

export const SiteIcon = styled.img`
  max-height: ${({ theme }) => theme.space[4]};
  max-width: ${({ theme }) => theme.space[5]};
`;

export const Provider = styled.a`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.importantText};
  margin-left: ${({ theme }) => theme.space[1]};
  text-decoration: none;
`;

export const Author = styled.a`
  font-weight: ${({ theme }) => theme.fontWeights.light};
  color: ${({ theme }) => theme.colors.importantText};
  margin-left: ${({ theme }) => theme.space[1]};
  text-decoration: none;
`;
