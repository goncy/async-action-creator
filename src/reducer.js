// @flow
import {
  divideAction,
  getError,
  getStatus,
  isAsync,
  getResponse
} from "./utils"

import type { standardAction } from "./types"

type asyncReducerType = {
  [name: string]: {
    status: string,
    error: ?string,
    response: ?any
  }
}

/**
 * Creates the action creator reducer
 * @param {object} initial state
 * @param {object} action
 * @return {object} new state
 */
export const reducer = (
  state: asyncReducerType = {},
  action: standardAction
): asyncReducerType => {
  if (isAsync(action)) {
    const { type, status } = divideAction(action)
    return Object.assign({}, state, {
      [type]: {
        status: getStatus(status),
        error: status === "REJECTED" ? getError(action) : null,
        response: status === "RESOLVED" ? getResponse(action) : null
      }
    })
  } else if (action.type === "@@actionCreator/CLEAR_STATUS") {
    return Object.assign({}, state, {
      [action.namespace]: undefined
    })
  } else {
    return state
  }
}
