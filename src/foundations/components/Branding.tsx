import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { LogoIcon } from "./icons/LogoIcon";
import { MyUserDetails } from "features/currentUser/MyUserDetails";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.sizes[3]};
  width: 100%;
  padding: ${({ theme }) => theme.space[6]};
  padding-bottom: 0px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.space[4]};
  min-height: ${({ theme }) => theme.sizes[1]};
  justify-content: space-between;
`;

const CompanyName = styled.span`
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-family: ${({ theme }) => theme.fonts.app};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const Branding: React.FC = () => {
  const theme = useContext(ThemeContext);
  return (
    <Wrapper>
      <LogoIcon></LogoIcon>
      <Details>
        <CompanyName>{theme.custom.companyName}</CompanyName>
        <MyUserDetails />
      </Details>
    </Wrapper>
  );
};
