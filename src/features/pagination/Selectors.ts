import { createSelector } from "reselect";
import { AppState } from "main/storeTypes";

const getPaginationSlice = (state: AppState) => state.pagination;
type SliceState = ReturnType<typeof getPaginationSlice>;

export const getUsersPaginationState = createSelector(
  [getPaginationSlice],
  (pagination: SliceState) => pagination.users
);

export const getChannelsPaginationState = createSelector(
  [getPaginationSlice],
  (pagination: SliceState) => pagination.channels
);

export const getChannelMembersPaginationStateById = createSelector(
  [getPaginationSlice],
  (pagination: SliceState) => pagination.members
);

export const getMembershipsPaginationStateById = createSelector(
  [getPaginationSlice],
  (pagination: SliceState) => pagination.memberships
);

export const getHistoryPaginationStateById = createSelector(
  [getPaginationSlice],
  (pagination: SliceState) => pagination.messages
);
