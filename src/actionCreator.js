// @flow
import { REDUCER_NAME } from "./constants";

import type { asyncReducerType } from "./types";

type asyncState = {
  [name: string]: ?any,
  [REDUCER_NAME]: asyncReducerType
};

type asyncAction = {
  run: (payload: ?any) => { type: string, payload: any },
  fetch: (payload: ?any) => { type: string, payload: any },
  update: (payload: ?any) => { type: string, payload: any },
  create: (payload: ?any) => { type: string, payload: any },
  remove: (payload: ?any) => { type: string, payload: any },
  start: (payload: ?any) => { type: string, payload: any },
  resolve: (payload: ?any) => { type: string, payload: any },
  reject: (payload: ?any) => { type: string, payload: any },
  getStatus: (state: asyncState) => string,
  getError: (state: asyncState) => ?string,
  getResponse: (state: asyncState) => ?any,
  clearStatus: () => void,
  TYPE: string,
  FETCH: string,
  UPDATE: string,
  CREATE: string,
  REMOVE: string,
  STARTED: string,
  RESOLVED: string,
  REJECTED: string
};

/**
 * Creates an async action
 * @param {string} type
 * @return {object} asyncAction
 */
export const createAction = (type: string): asyncAction => ({
  run: payload => ({ type, payload }),
  fetch: payload => ({ type: `${type}_FETCH`, payload }),
  update: payload => ({ type: `${type}_UPDATE`, payload }),
  create: payload => ({ type: `${type}_CREATE`, payload }),
  remove: payload => ({ type: `${type}_REMOVE`, payload }),
  start: payload => ({ type: `${type}_STARTED`, payload }),
  resolve: payload => ({ type: `${type}_RESOLVED`, payload }),
  reject: payload => ({ type: `${type}_REJECTED`, payload }),
  getStatus: ({ [REDUCER_NAME]: reducer }: asyncState) =>
    reducer[type] ? reducer[type].status : "init",
  getError: ({ [REDUCER_NAME]: reducer }: asyncState) =>
    reducer[type] ? reducer[type].error : undefined,
  getResponse: ({ [REDUCER_NAME]: reducer }: asyncState) =>
    reducer[type] ? reducer[type].response : undefined,
  clearStatus: () => ({
    type: `${REDUCER_NAME}/CLEAR_STATUS`,
    namespace: type
  }),
  TYPE: type,
  FETCH: `${type}_FETCH`,
  UPDATE: `${type}_UPDATE`,
  CREATE: `${type}_CREATE`,
  REMOVE: `${type}_REMOVE`,
  STARTED: `${type}_STARTED`,
  RESOLVED: `${type}_RESOLVED`,
  REJECTED: `${type}_REJECTED`
});

export default createAction;
