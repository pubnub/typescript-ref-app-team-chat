import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "main/storeTypes";
import { PresenceIndicatorIcon } from "foundations/components/icons/PresenceIndicatorIcon";
import { Wrapper } from "./NetworkStatus.style";

interface NetworkStatusProps {
  size: number;
}

const NetworkStatus = ({ size }: NetworkStatusProps) => {
  let isConnected: boolean = useSelector(
    (state: AppState) => state.networkStatus.isConnected
  );
  return (
    <Wrapper size={size}>
      <PresenceIndicatorIcon
        size={size}
        title={isConnected ? "connected" : "not connected"}
        active={isConnected}
      />
    </Wrapper>
  );
};

export { NetworkStatus };
