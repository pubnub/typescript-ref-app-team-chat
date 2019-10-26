import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "main/store";
import { PresenceIndicator as PresenceIndicatorIcon } from "foundations/components/icons/PresenceIndicator";
import { Wrapper } from "./NetworkStatus.style";

const NetworkStatus = () => {
  // Unexpectedly receiving a Boolean here, using !! to convert Boolean to boolean
  let isConnected: boolean = !!useSelector(
    (state: RootState) => state.networkStatus.isConnected
  );
  return (
    <Wrapper>
      <PresenceIndicatorIcon fill={isConnected ? "#B8E986" : "#E9EEF4"} />
    </Wrapper>
  );
};

export { NetworkStatus };
