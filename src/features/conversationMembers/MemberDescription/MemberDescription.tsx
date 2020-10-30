import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import useHover from "foundations/hooks/useHover";
import { Icon, Icons, Title } from "foundations/components/presentation";
import { Avatar, AvatarVariants } from "foundations/components/chat";
import { StyledBox, ListItem } from "foundations/components/layout";
import { getUniqueColor, getInitials } from "foundations/utilities";

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
  you: boolean;
}

const MemberDescription = ({ user, you }: MemberDescriptionProps) => {
  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 0 });
  const theme = useContext(ThemeContext);
  const avatarBg = getUniqueColor(
    user.id,
    (theme.colors.avatars as unknown) as string[]
  );
  const nameWithYou = `${user.name}${you ? " (you)" : ""}`;

  return (
    <ListItem bg={isHovering && theme.backgrounds.panelHover} {...hoverProps}>
      <Avatar variant={AvatarVariants.ROUND} bg={avatarBg}>
        {getInitials(user.name)}
      </Avatar>

      {user.presence && (
        <StyledBox position="relative" height={1}>
          <StyledBox
            position="absolute"
            top={0}
            right={0}
            style={{ transform: "translate(50%, -50%)" }}
          >
            <Icon icon={Icons.Presence} color={"success"} />
          </StyledBox>
        </StyledBox>
      )}

      <Title heading={nameWithYou} label={user.custom.title} capitalize></Title>
    </ListItem>
  );
};

export { MemberDescription };
