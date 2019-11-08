import React from "react";
import { useSelector } from "react-redux";
import { UserInitialsAvatar } from "foundations/components/UserInitialsAvatar";
import { getLoggedInUserId } from "features/authentication/authenticationStore";
import { getUsersById } from "features/users/userStore";
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
        <UserInitialsAvatar size={56} name={user.name} uuid={user.id} />
      </Avatar>
      <About>
        <UserName>{user.name}</UserName>
        <UserTitle>{user.custom.title}</UserTitle>
      </About>
    </Wrapper>
  );
};

export { MyUserDetails };
