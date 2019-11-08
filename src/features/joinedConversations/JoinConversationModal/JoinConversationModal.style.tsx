import styled from "styled-components/macro";

export const ScrollView = styled.section`
  text-align: left;
  overflow-y: scroll;

  > div {
    padding-bottom: 8px;
    border-top: 1px solid #f2f5f8;
    border-bottom: 1px solid #f2f5f8;
  }
`;

export const CloseButton = styled.span`
  margin: -8px;
  padding: 8px;
  cursor: pointer;
  margin: 20px 0 30px 30px;
  @media (max-width: 480px) {
    margin: 27px 0px 22px 30px;
  }
  color: #9c9d9d;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  color: #585858;
  font-weight: 500;
  text-align: left;
  margin: 30px 30px 30px 5px;
`;
