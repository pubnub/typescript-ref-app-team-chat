import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import PresenceIndicatorIcon from "components/icons/PresenceIndicator";
import { Wrapper } from "./style";

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

export default NetworkStatus;
