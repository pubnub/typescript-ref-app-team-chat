import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  margin: 48px 24px 24px 10px;
  @media (max-width: 480px) {
    margin: 24px 24px 24px 10px;
  }
`;

export const Avatar = styled.div`
  display: flex;
`;

export const About = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-top: 10px;
`;

export const UserName = styled.div`
  font-size: 15px;
  color: #585858;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  line-height: 20px;
`;

export const UserTitle = styled.div`
  font-size: 13px;
  color: #9b9b9b;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  line-height: 20px;
`;
