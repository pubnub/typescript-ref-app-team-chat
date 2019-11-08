import styled from "styled-components/macro";
import posed from "react-pose";

export const Wrapper = styled.section<{ pose: string }>`
  height: 100%;
  display: ${props => (props.pose === "closed" ? "none" : "flex")};
  flex-direction: column;
  max-width: 290px;
  width: 100%;
  @media (max-width: 480px) {
    margin-left: 0;
    max-width: none;
  }
`;

export const AnimatedWrapper = posed(Wrapper)({
  open: { width: "100%", applyAtStart: { display: "flex" } },
  closed: { width: "24px", applyAtEnd: { display: "none" } }
});

export const Title = styled.div`
  display: flex;
`;

export const Header = styled.div`
  font-size: 15px;
  color: #585858;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-weight: 500;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 24px 24px 24px 24px;
`;

export const CloseIcon = styled.span`
  cursor: pointer;
  @media (max-width: 480px) {
    display: none;
  }
`;

export const ScrollableView = styled.span`
  overflow-y: scroll;
`;

export const BackIconWrapper = styled.div`
  cursor: pointer;
  display: none;
  @media (max-width: 480px) {
    display: flex;
    margin-right: 25px;
  }
`;
