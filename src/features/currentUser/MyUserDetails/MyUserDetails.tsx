import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { usePubNub } from "pubnub-react";
import { fetchUserById } from "pubnub-redux";

export interface MyUserDetailsFragment {
  name: string;
  profileUrl: string;
  custom: {
    title: string;
  };
}
const MyUserDetails = () => {
  const pubnub = usePubNub();
  const dispatch = useDispatch();
  const userId = useSelector(getLoggedInUserId);
  const usersById = useSelector(getUsersById);
  const user = usersById[userId];

  useEffect(() => {
    if (user === undefined) {
      dispatch(fetchUserById(pubnub, userId));
    }

    pubnub.subscribe({
      channels: [userId]
    });
  }, [userId, user, pubnub, dispatch]);

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
