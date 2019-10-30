import React from "react";

import { Router } from "@reach/router";
import { LoginRoute } from "routes/login";
import { ChatRoute } from "routes/chat";
import { Wrapper } from "./style";

export const ApplicationRouter: React.FC = () => {
  return (
    <Router component={Wrapper}>
      <LoginRoute path="/login" />
      <ChatRoute path="/" />
    </Router>
  );
};
