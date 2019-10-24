import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  background-color: #f0f3f7;
  justify-content: space-between;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 200px;
`;

export const Title = styled.div`
  color: #3f3f3f;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 32px;
  padding: 50px;
  margin-bottom: 30px;
  align-self: center;
`;

export const Button = styled.button`
  width: 150px;
  text-transform: uppercase;
  align-self: center;
  width: 300px;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: white;
  border-radius: 32px;
  padding: 16px 0;
  background: #5baefc;
  &:focus {
    outline: none;
  }
  cursor: pointer;
`;

export const PoweredBy = styled.div`
  display: flex;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 19px;
  letter-spacing: 3px;
  justify-content: center;
  text-transform: uppercase;
  margin-bottom: -25px;
`;

export const PoweredByPubNub = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 180px;
  align-self: center;
  margin-bottom: 50px;
`;
