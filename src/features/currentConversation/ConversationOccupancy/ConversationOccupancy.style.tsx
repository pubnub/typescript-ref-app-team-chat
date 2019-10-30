import styled from "styled-components/macro";

export const Wrapper = styled.div<{ highlighted: boolean }>`
  display: flex;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  cursor: pointer;
  font-size: 13px;
  color: ${props => (props.highlighted ? "#3FABFF" : "#979797")};
  @media (max-width: 480px) {
    flex-direction: column-reverse;
    min-width: 50px;
    margin-left: 25px;
  }
`;

export const OccupancyNumber = styled.section`
  margin-right: 10px;
  @media (max-width: 480px) {
    margin-right: 0;
    margin-top: 2px;
  }
  cursor: pointer;
  em {
    font-style: normal;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
  }
`;

export const IconWrapper = styled.span`
  cursor: pointer;
`;
