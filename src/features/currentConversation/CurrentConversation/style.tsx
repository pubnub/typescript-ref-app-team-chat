import styled from "styled-components/macro";

import posed from "react-pose";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #f0f3f7;
  width: 100%;
  z-index: 5;
  margin: 24px;
  border-radius: 15px;
  @media (max-width: 480px) {
    margin: 0;
  }
`;

export const AnimatedWrapper = posed(Wrapper)({
  open: { applyAtStart: { display: "flex" } },
  closed: { applyAtEnd: { display: "none" } }
});

export const Body = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin: 0px 15px 15px 15px;
`;
