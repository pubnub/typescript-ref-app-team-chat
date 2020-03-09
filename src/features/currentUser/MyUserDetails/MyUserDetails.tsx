import React from "react";
import { useSelector } from "react-redux";
import { UserInitialsAvatar } from "foundations/components/UserInitialsAvatar";
import { getLoggedInUserId } from "features/authentication/authenticationModel";
import { getUsersById } from "features/users/userModel";
import { NetworkStatus } from "../NetworkStatus";
import {
  Wrapper,
  Avatar,
  About,
  UserName,
  UserTitle
} from "./MyUserDetails.style";

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

  // We must always have a user; change this to a development time error check
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Avatar>
        <NetworkStatus />
        <UserInitialsAvatar size={56} name={user.name} userId={user.id} />
      </Avatar>
      <About>
        <UserName>{user.name}</UserName>
        <UserTitle>{user.custom.title}</UserTitle>
      </About>
    </Wrapper>
  );
};

export { MyUserDetails };
