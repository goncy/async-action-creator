// @flow
import { REDUCER_NAME } from "./constants"

import type { asyncReducerType } from "./types"

type asyncState = {
  [name: string]: ?any,
  [REDUCER_NAME]: asyncReducerType
}

type asyncAction = {
  run: (payload: ?any) => { type: string, payload: any },
  start: (payload: ?any) => { type: string, payload: any },
  cancel: (payload: ?any) => { type: string, payload: any },
  resolve: (payload: ?any) => { type: string, payload: any },
  reject: (payload: ?any) => { type: string, payload: any },
  getStatus: (state: asyncState) => string,
  getError: (state: asyncState) => ?string,
  getResponse: (state: asyncState) => ?any,
  clearStatus: () => void,
  TYPE: string,
  START: string,
  CANCEL: string,
  RESOLVE: string,
  REJECT: string
}

/**
 * Creates an async action
 * @param {string} type
 * @return {object} asyncAction
 */
export const makeAction = (type: string): asyncAction => ({
  run: payload => ({ type, payload }),
  start: payload => ({ type: `${type}_STARTED`, payload }),
  cancel: payload => ({ type: `${type}_CANCELED`, payload }),
  resolve: payload => ({ type: `${type}_RESOLVED`, payload }),
  reject: payload => ({ type: `${type}_REJECTED`, payload }),
  getStatus: ({ [REDUCER_NAME]: reducer }: asyncState) =>
    reducer[type] ? reducer[type].status : "init",
  getError: ({ [REDUCER_NAME]: reducer }: asyncState) =>
    reducer[type] ? reducer[type].error : null,
  getResponse: ({ [REDUCER_NAME]: reducer }: asyncState) =>
    reducer[type] ? reducer[type].response : null,
  clearStatus: () => ({
    type: "@@actionCreator/CLEAR_STATUS",
    namespace: type
  }),
  TYPE: type,
  STARTED: `${type}_STARTED`,
  CANCELED: `${type}_CANCELED`,
  RESOLVED: `${type}_RESOLVED`,
  REJECTED: `${type}_REJECTED`
})

export default makeAction
