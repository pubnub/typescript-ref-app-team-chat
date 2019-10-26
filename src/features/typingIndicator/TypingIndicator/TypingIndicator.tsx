import React from "react";
import { useSelector } from "react-redux";
import { getTyping } from "../selectors";
import { Wrapper, NumberTyping } from "./TypingIndicator.style";

export type TypingIndicatorFragment = string[];

const TypingIndicator = () => {
  const usersTyping: TypingIndicatorFragment = useSelector(getTyping);
  const numberTyping = usersTyping.length;

  const joinUsers = (users: string[]) => {
    return users.length === 1
      ? users[0]
      : [users.slice(0, -1).join(", "), users[users.length - 1]].join(" and ");
  };

  return (
    <Wrapper>
      {numberTyping !== 0 && (
        <>
          <NumberTyping>
            {numberTyping > 4
              ? `${numberTyping} people`
              : joinUsers(usersTyping)}
          </NumberTyping>
          {numberTyping === 1 ? "is" : "are"} typing
        </>
      )}
    </Wrapper>
  );
};

export { TypingIndicator };
