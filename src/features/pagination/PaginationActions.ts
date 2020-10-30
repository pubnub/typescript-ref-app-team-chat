import { PaginationActionType } from "./PaginationActionType";
import { PaginationState } from "./PaginationReducer";

export interface SetUsersPaginationAction {
  type: PaginationActionType.SET_USERS_PAGINATION;
  payload: PaginationState;
}

export interface SetChannelsPaginationAction {
  type: PaginationActionType.SET_CHANNELS_PAGINATION;
  payload: PaginationState;
}

export interface SetChannelMembersPaginationAction {
  type: PaginationActionType.SET_CHANNEL_MEMBERS_PAGINATION;
  payload: {
    channelId: string;
    state: PaginationState;
  };
}

export interface SetMembershipsPaginationAction {
  type: PaginationActionType.SET_MEMBERSHIPS_PAGINATION;
  payload: {
    uuid: string;
    state: PaginationState;
  };
}

export interface SetHistoryPaginationAction {
  type: PaginationActionType.SET_HISTORY_PAGINATION;
  payload: {
    channelId: string;
    state: PaginationState;
  };
}

export type PaginationActions =
  | SetUsersPaginationAction
  | SetChannelsPaginationAction
  | SetChannelMembersPaginationAction
  | SetMembershipsPaginationAction
  | SetHistoryPaginationAction;

export const setUsersPagination = (
  state: PaginationState
): SetUsersPaginationAction => {
  return {
    type: PaginationActionType.SET_USERS_PAGINATION,
    payload: state
  };
};

export const setChannelsPagination = (
  state: PaginationState
): SetChannelsPaginationAction => {
  return {
    type: PaginationActionType.SET_CHANNELS_PAGINATION,
    payload: state
  };
};

export const setChannelMembersPagination = (
  channelId: string,
  state: PaginationState
): SetChannelMembersPaginationAction => {
  return {
    type: PaginationActionType.SET_CHANNEL_MEMBERS_PAGINATION,
    payload: {
      channelId,
      state
    }
  };
};

export const setMembershipsPagination = (
  uuid: string,
  state: PaginationState
): SetMembershipsPaginationAction => {
  return {
    type: PaginationActionType.SET_MEMBERSHIPS_PAGINATION,
    payload: {
      uuid,
      state
    }
  };
};

export const setHistoryPagination = (
  channelId: string,
  state: PaginationState
): SetHistoryPaginationAction => {
  return {
    type: PaginationActionType.SET_HISTORY_PAGINATION,
    payload: {
      channelId,
      state
    }
  };
};
