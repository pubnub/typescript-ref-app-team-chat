import React from "react";
import { UserInitialsAvatar } from "foundations/components/UserInitialsAvatar";

import {
  Wrapper,
  Avatar,
  About,
  PresenceDot,
  UserName,
  UserTitle
} from "./MemberDescription.style";

export interface UserFragment {
  name: string;
  id: string;
  custom: {
    title: string;
  };
  profileUrl: string;
  presence: boolean;
}

interface MemberDescriptionProps {
  user: UserFragment;
}

const MemberDescription = ({ user }: MemberDescriptionProps) => {
  return (
    <Wrapper>
      <Avatar>
        <UserInitialsAvatar
          size={36}
          name={user.name}
          userId={user.id}
          muted={!user.presence}
        />
      </Avatar>
      <About>
        <UserName muted={!user.presence}>
          {user.name}{" "}
          {user.presence && <PresenceDot presence={user.presence} />}
        </UserName>
        <UserTitle muted={!user.presence}>{user.custom.title}</UserTitle>
      </About>
    </Wrapper>
  );
};

export { MemberDescription };
