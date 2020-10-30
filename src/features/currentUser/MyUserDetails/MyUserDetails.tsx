import React from "react";
import { useSelector } from "react-redux";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import { getUsersById } from "features/users/userModel";
import { AppState } from "main/storeTypes";
import {
  Label,
  LabelVariants,
  Icon,
  Icons
} from "foundations/components/presentation";
import { StyledBox, FlexRow } from "foundations/components/layout";

export interface MyUserDetailsFragment {
  name: string;
  profileUrl: string;
  custom: {
    title: string;
  };
}

const MyUserDetails = () => {
  const userId = useSelector(getLoggedInUserId);
  const usersById = useSelector(getUsersById);
  const user = usersById[userId];
  const isConnected: boolean = useSelector(
    (state: AppState) => state.networkStatus.isConnected
  );

  // We must always have a user; change this to a development time error check
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <FlexRow>
      <Label variant={LabelVariants.INVERSE}>{user.name}</Label>

      <StyledBox marginLeft={1}>
        <Icon
          icon={Icons.Presence}
          title={isConnected ? "connected" : "not connected"}
          color={isConnected ? "success" : "inactive"}
        />
      </StyledBox>
    </FlexRow>
  );
};

export { MyUserDetails };
