// @flow
import type { standardAction } from "./types";

import {
  divideAction,
  getError,
  getStatus,
  isAsync,
  getResponse
} from "./utils";

import { REDUCER_NAME } from "./constants";

type asyncReducerType = {
  [name: string]: {
    status: string,
    error: ?string,
    response: ?any
  }
};

/**
 * Creates the action creator reducer
 * @param {object} initial state
 * @param {object} action
 * @return {object} new state
 */
const reducer = (
  state: asyncReducerType = {},
  action: standardAction
): asyncReducerType => {
  if (isAsync(action)) {
    const { type, status } = divideAction(action);
    return Object.assign({}, state, {
      [type]: {
        status: getStatus(status),
        error: status === "REJECTED" ? getError(action) : undefined,
        response: status === "RESOLVED" ? getResponse(action) : undefined
      }
    });
  } else if (action.type === `${REDUCER_NAME}/CLEAR_STATUS`) {
    return Object.assign({}, state, {
      [action.namespace]: undefined
    });
  } else {
    return state;
  }
};

export default reducer;
