(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AsyncActionCreator"] = factory();
	else
		root["AsyncActionCreator"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const REDUCER_NAME = exports.REDUCER_NAME = "@@actionCreator";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


/**
 * Checks if the action dispatched is async or not
 * @param {object} action
 * @return {boolean} response
 */
const isAsync = exports.isAsync = ({ type }) => ["STARTED", "RESOLVED", "REJECTED", "CANCELED"].indexOf(getPlainStatus(type)) >= 0;

/**
 * Returns the plain type of the action
 * @param {string} type
 * @return {string} plain type
 */
const getPlainType = exports.getPlainType = type => type.slice(0, type.lastIndexOf("_"));

/**
 * Returns the plain status of the action
 * @param {string} type
 * @return {string} plain status
 */
const getPlainStatus = exports.getPlainStatus = type => type.slice(type.lastIndexOf("_") + 1);

/**
 * Split the action in type name and async status
 * @param {object} action
 * @return {object} splited action
 */
const divideAction = exports.divideAction = ({ type }) => ({
  type: getPlainType(type),
  status: getPlainStatus(type)
});

/**
 * Returns the next status according to the action type
 * @param {string} type
 * @return {string} status
 */
const getStatus = exports.getStatus = status => {
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
const getResponse = exports.getResponse = ({ payload }) => {
  if (payload) return payload;else return undefined;
};

/**
 * Returns the error and returns undefined if there isn't any
 * @param {object} action
 * @return {string} status
 */
const getError = exports.getError = ({ payload }) => {
  if (payload) return payload;else return undefined;
};

/**
 * Calls a param with data if it's a function
 * @param {function} param
 * @param {any} data
 * @return {any} data
 */
const hydrate = exports.hydrate = (param, data) => typeof param === "function" ? param(data) : param;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REDUCER_NAME = exports.middleware = exports.reducer = exports.createAction = undefined;

var _actionCreator = __webpack_require__(3);

var _actionCreator2 = _interopRequireDefault(_actionCreator);

var _reducer = __webpack_require__(4);

var _reducer2 = _interopRequireDefault(_reducer);

var _middleware = __webpack_require__(5);

var _middleware2 = _interopRequireDefault(_middleware);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createAction = _actionCreator2.default;
exports.reducer = _reducer2.default;
exports.middleware = _middleware2.default;
exports.REDUCER_NAME = _constants.REDUCER_NAME;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAction = undefined;

var _constants = __webpack_require__(0);

/**
 * Creates an async action
 * @param {string} type
 * @return {object} asyncAction
 */
const createAction = exports.createAction = type => ({
  run: payload => ({ type, payload }),
  start: payload => ({ type: `${type}_STARTED`, payload }),
  cancel: payload => ({ type: `${type}_CANCELED`, payload }),
  resolve: payload => ({ type: `${type}_RESOLVED`, payload }),
  reject: payload => ({ type: `${type}_REJECTED`, payload }),
  getStatus: ({ [_constants.REDUCER_NAME]: reducer }) => reducer[type] ? reducer[type].status : "init",
  getError: ({ [_constants.REDUCER_NAME]: reducer }) => reducer[type] ? reducer[type].error : undefined,
  getResponse: ({ [_constants.REDUCER_NAME]: reducer }) => reducer[type] ? reducer[type].response : undefined,
  clearStatus: () => ({
    type: `${_constants.REDUCER_NAME}/CLEAR_STATUS`,
    namespace: type
  }),
  TYPE: type,
  STARTED: `${type}_STARTED`,
  CANCELED: `${type}_CANCELED`,
  RESOLVED: `${type}_RESOLVED`,
  REJECTED: `${type}_REJECTED`
});
exports.default = createAction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

var _constants = __webpack_require__(0);

/**
 * Creates the action creator reducer
 * @param {object} initial state
 * @param {object} action
 * @return {object} new state
 */
const reducer = (state = {}, action) => {
  if ((0, _utils.isAsync)(action)) {
    const { type, status } = (0, _utils.divideAction)(action);
    return Object.assign({}, state, {
      [type]: {
        status: (0, _utils.getStatus)(status),
        error: status === "REJECTED" ? (0, _utils.getError)(action) : undefined,
        response: status === "RESOLVED" ? (0, _utils.getResponse)(action) : undefined
      }
    });
  } else if (action.type === `${_constants.REDUCER_NAME}/CLEAR_STATUS`) {
    return Object.assign({}, state, {
      [action.namespace]: undefined
    });
  } else {
    return state;
  }
};
exports.default = reducer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

const middleware = services => store => next => async action => {
  const { type, payload } = action;
  const match = services[type];

  if (match) {
    let { uri, method, selector, options = {} } = match;

    try {
      next(action);

      store.dispatch({ type: `${type}_STARTED` });

      const request = await fetch((0, _utils.hydrate)(uri, payload), Object.assign({}, { method }, options));
      const response = await request.json();
      const data = selector(response);

      store.dispatch({ type: `${type}_RESOLVED`, payload: data });
    } catch (error) {
      store.dispatch({ type: `${type}_REJECTED`, payload: error });
    }
  } else {
    return next(action);
  }
};

exports.default = middleware;

/***/ })
/******/ ]);
});