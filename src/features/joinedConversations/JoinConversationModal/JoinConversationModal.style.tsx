import styled from "styled-components/macro";
import posed from "react-pose";

export const Overlay = styled.div<{ displayed: boolean }>`
  position: fixed;
  display: ${props => (props.displayed ? "flex" : "none")};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const Wrapper = styled.section<{ pose: string }>`
  display: ${props => (props.pose === "closed" ? "none" : "flex")};
  width: 48%;
  height: 80%;
  position: absolute;
  left: 80%;
  top: 50%;
  left: 50%;
  z-index: 10;
  padding: 16px 35px;
  text-align: center;
  transform: translate(-50%, -50%);
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  box-shadow: 3px 11px 17px 10px #717171;

  @media (max-width: 480px) {
    padding: 0 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const AnimatedWrapper = posed(Wrapper)({
  closed: { top: "-200%" },
  open: { top: "50%" }
});

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
