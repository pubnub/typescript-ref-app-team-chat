import React from "react";
import { useDispatch } from "react-redux";
import {
  Wrapper,
  Button,
  Title,
  PoweredByPubNub,
  PoweredBy,
  Body
} from "./style";
import PubNubLogo from "./PubNub_Logo.svg";
import { login } from "features/authentication/authenticationActions";
import { isLoggingIn } from "features/authentication/authenticationStore";
import { useSelector } from "react-redux";

const KnownIds = [
  "jblaasch0",
  "mtrowl1",
  "saspell2",
  "fboult3",
  "bespinay4",
  "asiflet5",
  "fmartignoni6",
  "aferronet7",
  "pferries8",
  "fkelwick9",
  "ahinchshawa",
  "rbrahamb",
  "bvollethc",
  "jkurtend",
  "ewanleye",
  "amckagf",
  "glampartg",
  "dgronaverh",
  "dwillacoti",
  "ebiffinj",
  "tkerrigank",
  "bganningl",
  "fbolinom",
  "regann",
  "cclydeo",
  "ndymokep",
  "skikeq",
  "pansteyr",
  "mpettefords",
  "kgeramt",
  "mflecknellu",
  "rmeekev",
  "lgawnew",
  "aboundex",
  "hgilffillany",
  "wbohdenz",
  "mroon10",
  "bwardrop11",
  "cfattore12",
  "draubenheimers13",
  "wsimenot14",
  "gtyrone15",
  "cmclenahan16",
  "szavattiero17",
  "dadami18",
  "bjay19",
  "gnolleth1a",
  "gpasse1b",
  "ngascard1c",
  "ezucker1d",
  "bduffit1e",
  "blockitt1f",
  "dcready1g",
  "mmacaree1h",
  "rdorken1i",
  "jcolchett1j",
  "cbennion1k",
  "gbohey1l",
  "mreeves1m",
  "atear1n",
  "vharby1o",
  "lveighey1p",
  "ccookman1q",
  "aghione1r",
  "cstalman1s",
  "ngrint1t",
  "aosgood1u",
  "sbehnecken1v",
  "gsausman1w",
  "jbridgeman1x",
  "jeddowes1y",
  "dcasier1z",
  "lheisler20",
  "nwaleworke21",
  "ehearthfield22",
  "hpiniur23",
  "wmcbride24",
  "cmcrobert25",
  "igorelli26",
  "jfourman27",
  "kpietrowicz28",
  "ytonnesen29",
  "hwhimp2a",
  "edanelut2b",
  "frozenzweig2c",
  "crossander2d"
];

const Login = () => {
  const dispatch = useDispatch();
  const loggingIn = useSelector(isLoggingIn);

  const handleClick = () => {
    const userId = KnownIds[Math.floor(Math.random() * KnownIds.length)];
    dispatch(login(userId));
  };

  return (
    <Wrapper>
      <Body>
        <Title>Team Chat</Title>
        <Button onClick={handleClick}>
          {loggingIn ? "Logging In" : "Log in"}
        </Button>
      </Body>
      <PoweredByPubNub>
        <PoweredBy>Powered By</PoweredBy>
        <img alt="PubNub" src={PubNubLogo} />
      </PoweredByPubNub>
    </Wrapper>
  );
};

export default Login;
