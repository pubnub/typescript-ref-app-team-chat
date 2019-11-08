import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "main/storeTypes";
import { PresenceIndicator as PresenceIndicatorIcon } from "foundations/components/icons/PresenceIndicator";
import { Wrapper } from "./NetworkStatus.style";

const NetworkStatus = () => {
  let isConnected: boolean = useSelector(
    (state: AppState) => state.networkStatus.isConnected
  );
  return (
    <Wrapper>
      <PresenceIndicatorIcon fill={isConnected ? "#B8E986" : "#E9EEF4"} />
    </Wrapper>
  );
};

export { NetworkStatus };
