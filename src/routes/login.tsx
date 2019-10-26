import React from "react";
import { Login } from "features/authentication/Login/Login";
import { RouteComponentProps } from "@reach/router";

export const LoginRoute = (props: RouteComponentProps) => {
  return <Login />;
};
