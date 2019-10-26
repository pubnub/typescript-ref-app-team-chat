import styled from "styled-components/macro";
import posed from "react-pose";

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  text-align: center;
  padding: 10% 20%;
  @media (max-width: 480px) {
    padding: 0 0;
  }
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const AnimatedWrapper = posed(Wrapper)({
  closed: { top: "-200%" },
  open: { top: "0" }
});

export const ScrollView = styled.section`
  text-align: left;
  overflow-y: scroll;

  > div {
    padding-bottom: 8px;
    border-bottom: 1px solid #f2f5f8;
  }
`;

export const CloseButton = styled.span`
  margin: -8px;
  padding: 8px;
  cursor: pointer;
  margin: 20px 30px 30px 30px;
  color: #9c9d9d;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  text-align: left;
  margin: 30px 30px 30px 30px;
`;
