// @flow
import type { standardAction } from "./types";

type dividedAction = {
  type: string,
  status: string
};

/**
 * Checks if the action dispatched is async or not
 * @param {object} action
 * @return {boolean} response
 */
export const isAsync = ({ type }: standardAction): boolean =>
  ["STARTED", "RESOLVED", "REJECTED", "CANCELED"].indexOf(
    getPlainStatus(type)
  ) >= 0;

/**
 * Returns the plain type of the action
 * @param {string} type
 * @return {string} plain type
 */
export const getPlainType = (type: string): string =>
  type.slice(0, type.lastIndexOf("_"));

/**
 * Returns the plain status of the action
 * @param {string} type
 * @return {string} plain status
 */
export const getPlainStatus = (type: string): string =>
  type.slice(type.lastIndexOf("_") + 1);

/**
 * Split the action in type name and async status
 * @param {object} action
 * @return {object} splited action
 */
export const divideAction = ({ type }: standardAction): dividedAction => ({
  type: getPlainType(type),
  status: getPlainStatus(type)
});

/**
 * Returns the next status according to the action type
 * @param {string} type
 * @return {string} status
 */
export const getStatus = (status: string): string => {
  switch (status) {
    case "STARTED":
      return "pending";
    case "CANCELED":
      return "canceled";
    case "RESOLVED":
      return "resolved";
    case "REJECTED":
      return "rejected";
    default:
      return "init";
  }
};

/**
 * Returns the payload sent and returns undefined if there isn't any
 * @param {object} action
 * @return {string} status
 */
export const getResponse = ({ payload }: standardAction): string => {
  if (payload) return payload;
  else return undefined;
};

/**
 * Returns the error and returns undefined if there isn't any
 * @param {object} action
 * @return {string} status
 */
export const getError = ({ payload }: standardAction): string => {
  if (payload) return payload;
  else return undefined;
};

/**
 * Calls a param with data if it's a function
 * @param {function} param
 * @param {any} data
 * @return {any} data
 */
export const hydrate = (param, data) =>
  typeof param === "function" ? param(data) : param;
