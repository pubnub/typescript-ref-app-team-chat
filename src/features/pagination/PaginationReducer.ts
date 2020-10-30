import { PaginationActions } from "./PaginationActions";
import { PaginationActionType } from "./PaginationActionType";

export type PaginationState =
  | {
      pagination: string | undefined;
      count: number | null;
      pagesRemain: boolean;
    }
  | undefined;

interface PaginationSliceState {
  users: PaginationState;
  channels: PaginationState;
  members: {
    [channelId: string]: PaginationState;
  };
  memberships: {
    [uuid: string]: PaginationState;
  };
  messages: {
    [uuid: string]: PaginationState;
  };
}

const updatePagination = (
  state: PaginationSliceState,
  key: "users" | "channels",
  paginationState: PaginationState
): PaginationSliceState => {
  return {
    ...state,
    [key]: paginationState
  };
};

const nestedUpdatePagination = (
  state: PaginationSliceState,
  key: "members" | "memberships" | "messages",
  id: string,
  paginationState: PaginationState
): PaginationSliceState => {
  return {
    ...state,
    [key]: {
      ...state[key],
      [id]: paginationState
    }
  };
};

const initialState: PaginationSliceState = {
  users: undefined,
  channels: undefined,
  members: {},
  memberships: {},
  messages: {}
};

export const PaginationStateReducer = (
  state: PaginationSliceState = initialState,
  action: PaginationActions
): PaginationSliceState => {
  switch (action.type) {
    case PaginationActionType.SET_USERS_PAGINATION:
      return updatePagination(state, "users", action.payload);
    case PaginationActionType.SET_CHANNELS_PAGINATION:
      return updatePagination(state, "channels", action.payload);
    case PaginationActionType.SET_CHANNEL_MEMBERS_PAGINATION:
      return nestedUpdatePagination(
        state,
        "members",
        action.payload.channelId,
        action.payload.state
      );
    case PaginationActionType.SET_MEMBERSHIPS_PAGINATION:
      return nestedUpdatePagination(
        state,
        "memberships",
        action.payload.uuid,
        action.payload.state
      );
    case PaginationActionType.SET_HISTORY_PAGINATION:
      return nestedUpdatePagination(
        state,
        "messages",
        action.payload.channelId,
        action.payload.state
      );

    default:
      return state;
  }
};
