import React, { useState, useContext } from "react";
import { useDispatch } from "main/useDispatch";
import image from "./background.png";
import logo from "./logo.svg";
import { login } from "../loginCommand";
import { isLoggingIn } from "../authenticationModel";
import { isUserLoggedIn } from "features/authentication/authenticationModel";
import { useSelector } from "react-redux";
import KnownIds from "config/knownUserIds.json";
import screenshot from "./screenshot.png";
import { getUsersById } from "features/users/userModel";
import { ThemeContext } from "styled-components";
import { FlexRow, FlexColumn, StyledBox } from "foundations/components/layout";
import {
  Label,
  LabelVariants,
  Heading,
  HeadingSizes,
  HeadingVariants,
  Button,
  ButtonVariants,
  Input,
  InputVariants
} from "foundations/components/presentation";

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

  const renderForm = () => (
    <FlexColumn>
      <StyledBox
        height="30px"
        backgroundImage={`url(${logo})`}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      />
      <StyledBox paddingTop="6" paddingBottom="1">
        <Label variant={LabelVariants.DARK}>Username</Label>
      </StyledBox>
      <Input
        readOnly
        value={user ? user.name.toLowerCase().replace(" ", ".") : ""}
        variant={InputVariants.DARK}
      />
      <StyledBox paddingTop="6" paddingBottom="1">
        <Label variant={LabelVariants.DARK}>Password</Label>
      </StyledBox>
      <Input
        readOnly
        type="password"
        value={"password123"}
        variant={InputVariants.DARK}
      />

      <StyledBox marginTop="8">
        <Button
          variant={ButtonVariants.PRIMARY}
          onClick={loginWithRandomlyPickedUser}
        >
          {loggingIn ? "Connecting" : "Log In"}
        </Button>
      </StyledBox>
    </FlexColumn>
  );

  return (
    <FlexColumn
      py={[0, "10vh"]}
      px={[0, "15%"]}
      height="100%"
      backgroundImage={`url(${image})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <FlexRow alignItems="stretch" flexGrow={1}>
        <FlexColumn
          justifyContent="flex-end"
          display={["none", "none", "flex"]}
          background={theme.backgrounds.login}
          borderTopLeftRadius="strong"
          borderBottomLeftRadius="strong"
          maxWidth="360px"
        >
          <StyledBox px="8" py="2">
            <Heading
              size={HeadingSizes.HUGE}
              variant={HeadingVariants.INVERSE}
              textAlign="center"
            >
              {theme.custom.tagLine}
            </Heading>
          </StyledBox>
          <FlexRow justifyContent="center">
            <img alt="pubnub chat screenshot" src={screenshot} />
          </FlexRow>
        </FlexColumn>

        <FlexRow
          bg="backgrounds.content"
          flexGrow={1}
          justifyContent="center"
          borderRadius={["square", "strong", "strong"]}
          borderTopLeftRadius={["square", "strong", "square"]}
          borderBottomLeftRadius={["square", "strong", "square"]}
        >
          {renderForm()}
        </FlexRow>
      </FlexRow>
    </FlexColumn>
  );
};

export { Login };
