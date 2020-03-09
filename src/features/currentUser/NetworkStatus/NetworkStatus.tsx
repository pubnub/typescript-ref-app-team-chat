import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "main/storeTypes";
import { PresenceIndicatorIcon } from "foundations/components/icons/PresenceIndicatorIcon";
import { Wrapper } from "./NetworkStatus.style";

const NetworkStatus = () => {
  let isConnected: boolean = useSelector(
    (state: AppState) => state.networkStatus.isConnected
  );
  return (
    <Wrapper>
      <PresenceIndicatorIcon
        title={isConnected ? "connected" : "not connected"}
        active={isConnected}
      />
    </Wrapper>
  );
};

export { NetworkStatus };
