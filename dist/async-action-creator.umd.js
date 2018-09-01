(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['async-action-creator'] = {})));
}(this, (function (exports) { 'use strict';

  var REDUCER_NAME = "@@actionCreator";

  /**
   * Creates an async action
   * @param {string} type
   * @return {object} asyncAction
   */
  var createAction = function createAction(type) {
    return {
      run: function run(payload) {
        return {
          type: type,
          payload: payload
        };
      },
      start: function start(payload) {
        return {
          type: "".concat(type, "_STARTED"),
          payload: payload
        };
      },
      cancel: function cancel(payload) {
        return {
          type: "".concat(type, "_CANCELED"),
          payload: payload
        };
      },
      resolve: function resolve(payload) {
        return {
          type: "".concat(type, "_RESOLVED"),
          payload: payload
        };
      },
      reject: function reject(payload) {
        return {
          type: "".concat(type, "_REJECTED"),
          payload: payload
        };
      },
      getStatus: function getStatus(_ref) {
        var reducer = _ref[REDUCER_NAME];
        return reducer[type] ? reducer[type].status : "init";
      },
      getError: function getError(_ref2) {
        var reducer = _ref2[REDUCER_NAME];
        return reducer[type] ? reducer[type].error : undefined;
      },
      getResponse: function getResponse(_ref3) {
        var reducer = _ref3[REDUCER_NAME];
        return reducer[type] ? reducer[type].response : undefined;
      },
      clearStatus: function clearStatus() {
        return {
          type: "".concat(REDUCER_NAME, "/CLEAR_STATUS"),
          namespace: type
        };
      },
      TYPE: type,
      STARTED: "".concat(type, "_STARTED"),
      CANCELED: "".concat(type, "_CANCELED"),
      RESOLVED: "".concat(type, "_RESOLVED"),
      REJECTED: "".concat(type, "_REJECTED")
    };
  };

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * Checks if the action dispatched is async or not
   * @param {object} action
   * @return {boolean} response
   */
  var isAsync = function isAsync(_ref) {
    var type = _ref.type;
    return ["STARTED", "RESOLVED", "REJECTED", "CANCELED"].indexOf(getPlainStatus(type)) >= 0;
  };
  /**
   * Returns the plain type of the action
   * @param {string} type
   * @return {string} plain type
   */

  var getPlainType = function getPlainType(type) {
    return type.slice(0, type.lastIndexOf("_"));
  };
  /**
   * Returns the plain status of the action
   * @param {string} type
   * @return {string} plain status
   */

  var getPlainStatus = function getPlainStatus(type) {
    return type.slice(type.lastIndexOf("_") + 1);
  };
  /**
   * Split the action in type name and async status
   * @param {object} action
   * @return {object} splited action
   */

  var divideAction = function divideAction(_ref2) {
    var type = _ref2.type;
    return {
      type: getPlainType(type),
      status: getPlainStatus(type)
    };
  };
  /**
   * Returns the next status according to the action type
   * @param {string} type
   * @return {string} status
   */

  var getStatus = function getStatus(status) {
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

  var getResponse = function getResponse(_ref3) {
    var payload = _ref3.payload;
    if (payload) return payload;else return undefined;
  };
  /**
   * Returns the error and returns undefined if there isn't any
   * @param {object} action
   * @return {string} status
   */

  var getError = function getError(_ref4) {
    var payload = _ref4.payload;
    if (payload) return payload;else return undefined;
  };
  /**
   * Calls a param with data if it's a function
   * @param {function} param
   * @param {any} data
   * @return {any} data
   */

  var hydrate = function hydrate(param, data) {
    return typeof param === "function" ? param(data) : param;
  };

  /**
   * Creates the action creator reducer
   * @param {object} initial state
   * @param {object} action
   * @return {object} new state
   */
  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (isAsync(action)) {
      var _divideAction = divideAction(action),
          type = _divideAction.type,
          status = _divideAction.status;

      return Object.assign({}, state, _defineProperty({}, type, {
        status: getStatus(status),
        error: status === "REJECTED" ? getError(action) : undefined,
        response: status === "RESOLVED" ? getResponse(action) : undefined
      }));
    } else if (action.type === "".concat(REDUCER_NAME, "/CLEAR_STATUS")) {
      return Object.assign({}, state, _defineProperty({}, action.namespace, undefined));
    } else {
      return state;
    }
  };

  var middleware = function middleware(services) {
    return function (store) {
      return function (next) {
        return function (action) {
          if (!services) throw new Error("No services were passed to the async-action-creator middleware, you have to pass an object like:\n      {\n        [string]: {\n          uri: string|Function,\n          method: string,\n          selector?: Function,\n          options?: Object|Function\n        }\n      }\n  ");
          if (!store || !next || !action) throw new Error("Redux data (store, next or action) is missing, it looks like a configuration problem, take a look and try again");
          var type = action.type,
              payload = action.payload;
          var match = services[type];

          if (match) {
            var uri = match.uri,
                method = match.method,
                selector = match.selector,
                _match$options = match.options,
                options = _match$options === void 0 ? {} : _match$options;
            next(action);
            store.dispatch({
              type: "".concat(type, "_STARTED")
            });
            return fetch(hydrate(uri, payload), _objectSpread({}, options, {
              method: method
            })).then(function (response) {
              return response.json();
            }).then(function (data) {
              return selector ? selector(data) : data;
            }).then(function (data) {
              return store.dispatch({
                type: "".concat(type, "_RESOLVED"),
                payload: data
              });
            }).catch(function (error) {
              return store.dispatch({
                type: "".concat(type, "_REJECTED"),
                payload: error
              });
            });
          } else {
            return next(action);
          }
        };
      };
    };
  };

  exports.createAction = createAction;
  exports.reducer = reducer;
  exports.middleware = middleware;
  exports.REDUCER_NAME = REDUCER_NAME;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
