import React, { useState, useContext } from "react";
import { useDispatch } from "main/useDispatch";
import {
  Wrapper,
  Button,
  Promo,
  TagLine,
  Screenshot,
  Content,
  LoginForm,
  Logo,
  Label,
  Field,
  Body
} from "./Login.style";
import logo from "./logo.svg";
import { login } from "../loginCommand";
import { isLoggingIn } from "../authenticationModel";
import { isUserLoggedIn } from "features/authentication/authenticationModel";
import { useSelector } from "react-redux";
import KnownIds from "config/knownUserIds.json";
import screenshot from "./screenshot.png";
import { getUsersById } from "features/users/userModel";
import { ThemeContext } from "styled-components";

const Login = () => {
  const dispatch = useDispatch();
  const loggingIn = useSelector(isLoggingIn);
  const loggedIn = useSelector(isUserLoggedIn);
  const theme = useContext(ThemeContext);
  // show the username in the email field
  const usersById = useSelector(getUsersById);
  const [userId, setUserId] = useState("");
  const user = usersById[userId];

  const loginWithRandomlyPickedUser = () => {
    if (loggingIn || loggedIn || userId !== "") {
      return;
    }
    const randomUserId = KnownIds[Math.floor(Math.random() * KnownIds.length)];
    setUserId(randomUserId);
    dispatch(login(randomUserId));
  };

  if (!loggedIn && !loggingIn) {
    loginWithRandomlyPickedUser();
  }

  return (
    <Wrapper>
      <Body>
        <Promo>
          <TagLine>{theme.custom.tagLine}</TagLine>
          <Screenshot>
            <img alt="pubnub chat screenshot" src={screenshot} />
          </Screenshot>
        </Promo>
        <Content>
          <LoginForm>
            <Logo alt="PubNub" src={logo} />
            <Label>Username</Label>
            <Field
              readOnly
              value={user ? user.name.toLowerCase().replace(" ", ".") : ""}
            />
            <Label>Password</Label>
            <Field readOnly type="password" value={"password123"} />
            <Button onClick={loginWithRandomlyPickedUser}>
              {loggingIn ? "Connecting" : "Log In"}
            </Button>
          </LoginForm>
        </Content>
      </Body>
    </Wrapper>
  );
};

export { Login };
