import { Dispatch } from "redux";
import { AppState } from "main/storeTypes";
import { createSelector } from "reselect";
import { createSignalReducer, Signal } from "pubnub-redux";
import { SignalActionType, PresenceCategory } from "pubnub-redux";
import { AppActions } from "main/AppActions";
import { SignalState } from "pubnub-redux/dist/features/signal/SignalReducer";
import { MessageActionType } from "pubnub-redux";
import { PresenceEventMessage } from "pubnub-redux/dist/features/presence/PresenceActions";

export const TYPING_INDICATOR_DURATION_SECONDS = 10;

export enum TypingIndicatorType {
  ShowTypingIndicator = "ti_show",
  HideTypingIndicator = "ti_hide"
}

export enum TypingIndicatorActionType {
  REMOVE_TYPING_INDICATOR = "REMOVE_TYPING_INDICATOR",
  REMOVE_TYPING_INDICATOR_ALL = "REMOVE_TYPING_INDICATOR_ALL"
}

export interface TypingIndicator extends Signal {
  type: TypingIndicatorType;
}

export type TypingIndicatorEnvelope = Required<
  Pick<Signal, "channel" | "message" | "timetoken" | "publisher">
> & {
  message: TypingIndicator;
};

const signalReducer = createSignalReducer<TypingIndicatorEnvelope>();

const defaultState = { byId: {} };

const removeTypingIndicator = (
  state: SignalState<TypingIndicatorEnvelope>,
  channel: string,
  userId: string,
  timetoken?: number
): SignalState<TypingIndicatorEnvelope> => {
  let newState = {
    byId: { ...state.byId }
  };

  if (newState.byId[channel]) {
    newState.byId[channel] = newState.byId[channel].filter(signal =>
      timetoken
        ? !(signal.publisher === userId && signal.timetoken === timetoken)
        : !(signal.publisher === userId)
    );
  }

  return newState;
};

/**
 * create a reducer which holds all typing indicator signal objects in a normalized form
 */
export const TypingIndicatorStateReducer = (
  state: SignalState<TypingIndicatorEnvelope>,
  action: AppActions
): SignalState<TypingIndicatorEnvelope> => {
  switch (action.type) {
    case SignalActionType.SIGNAL_RECEIVED:
      if (
        action.payload.message.type === TypingIndicatorType.ShowTypingIndicator
      ) {
        // we only want to store the show typing indicator signals
        // the hide signal is handled by the listener below
        return signalReducer(state, action);
      }

      return state || defaultState;
    case TypingIndicatorActionType.REMOVE_TYPING_INDICATOR:
      return removeTypingIndicator(
        state,
        action.payload.channel,
        action.payload.userId,
        action.payload.timetoken
      );
    case TypingIndicatorActionType.REMOVE_TYPING_INDICATOR_ALL:
      return removeTypingIndicator(
        state,
        action.payload.channel,
        action.payload.userId
      );
    case MessageActionType.MESSAGE_RECEIVED:
      return removeTypingIndicator(
        state,
        action.payload.channel,
        action.payload.message.senderId
      );
    default:
      return state || defaultState;
  }
};

export interface RemoveTypingIndicatorPayload {
  userId: string;
  channel: string;
  timetoken: number;
}

export interface RemoveTypingIndicatorAllPayload {
  userId: string;
  channel: string;
}

export interface RemoveTypingIndicatorAction {
  type: typeof TypingIndicatorActionType.REMOVE_TYPING_INDICATOR;
  payload: RemoveTypingIndicatorPayload;
}

export interface RemoveTypingIndicatorAllAction {
  type: typeof TypingIndicatorActionType.REMOVE_TYPING_INDICATOR_ALL;
  payload: RemoveTypingIndicatorAllPayload;
}

/**
 * This Slice selector is used internally to access the state of the reducer,
 * primarily as the base selector function for creating other selectors.
 */
const getTypingIndicatorsSlice = (
  state: AppState
): SignalState<TypingIndicatorEnvelope> => state.typingIndicators;

/**
 * Returns an index which can be used to find signal objects
 */
export const getTypingIndicatorsById = createSelector(
  [getTypingIndicatorsSlice],
  typingIndicators => {
    return typingIndicators.byId;
  }
);

export const typingIndicatorRemoved = (
  payload: RemoveTypingIndicatorPayload
): RemoveTypingIndicatorAction => ({
  type: TypingIndicatorActionType.REMOVE_TYPING_INDICATOR,
  payload
});

export const typingIndicatorRemovedAll = (
  payload: RemoveTypingIndicatorAllPayload
): RemoveTypingIndicatorAllAction => ({
  type: TypingIndicatorActionType.REMOVE_TYPING_INDICATOR_ALL,
  payload
});

/**
 * This listener will initiate a timer to dispatch a RemoveTypingIndicatorAction once the
 * TYPING_INDICATOR_DURATION_SECONDS time is passed
 */
export const createTypingIndicatorsListener = (
  dispatch: Dispatch<AppActions>
): any => ({
  signal: (payload: TypingIndicatorEnvelope) => {
    if (payload.message.type === TypingIndicatorType.ShowTypingIndicator) {
      // hide indicator after display seconds
      setTimeout(() => {
        dispatch(
          typingIndicatorRemoved({
            userId: payload.publisher,
            channel: payload.channel,
            timetoken: payload.timetoken
          })
        );
      }, TYPING_INDICATOR_DURATION_SECONDS * 1000);
    } else if (
      payload.message.type === TypingIndicatorType.HideTypingIndicator
    ) {
      // hide indicator now, removes all for user regardless of time token
      dispatch(
        typingIndicatorRemovedAll({
          userId: payload.publisher,
          channel: payload.channel
        })
      );
    }
  },
  presence: (payload: PresenceEventMessage) => {
    if (
      payload.action === PresenceCategory.LEAVE ||
      payload.action === PresenceCategory.TIMEOUT
    ) {
      dispatch(
        typingIndicatorRemovedAll({
          userId: payload.uuid,
          channel: payload.channel
        })
      );
    }
  }
});
