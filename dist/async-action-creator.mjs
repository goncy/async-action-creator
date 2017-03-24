/**
 * Creates an async action
 * @param {string} type
 * @return {object} asyncAction
 */
var makeAction = function makeAction(type) {
  return {
    type: type,
    run: function run(payload) {
      return { type: type, payload: payload };
    },
    start: function start(payload) {
      return { type: type + '_START', payload: payload };
    },
    success: function success(payload) {
      return { type: type + '_SUCCESS', payload: payload };
    },
    failure: function failure(payload) {
      return { type: type + '_FAILURE', payload: payload };
    },
    getStatus: function getStatus(_ref) {
      var async = _ref.async;
      return async[type] ? async[type].status : 'init';
    },
    getError: function getError(_ref2) {
      var async = _ref2.async;
      return async[type] ? async[type].error : null;
    },
    getResponse: function getResponse(_ref3) {
      var async = _ref3.async;
      return async[type] ? async[type].response : null;
    },
    clearStatus: function clearStatus(_ref4) {
      var async = _ref4.async;
      return { type: '@@actionCreator/CLEAR_STATUS', namespace: type };
    },
    START: type + '_START',
    SUCCESS: type + '_SUCCESS',
    FAILURE: type + '_FAILURE'
  };
};

/**
 * Checks if the action dispatched is async or not
 * @param {object} action
 * @return {boolean} response
 */
var isAsync = function isAsync(_ref) {
  var type = _ref.type;
  return ['START', 'SUCCESS', 'FAILURE'].indexOf(type.slice(type.lastIndexOf('_') + 1)) >= 0;
};

/**
 * Split the action in type name and async status
 * @param {object} action
 * @return {object} splited action
 */
var divideAction = function divideAction(_ref2) {
  var type = _ref2.type;
  return {
    type: type.slice(0, type.lastIndexOf('_')),
    status: type.slice(type.lastIndexOf('_') + 1)
  };
};

/**
 * Returns the next status according to the action type
 * @param {string} type
 * @return {string} status
 */
var getStatus = function getStatus(status) {
  switch (status) {
    case 'START':
      return 'pending';
    case 'SUCCESS':
      return 'success';
    case 'FAILURE':
      return 'failure';
    default:
      return 'init';
  }
};

/**
 * Returns the payload sent and returns null if there isn't any
 * @param {object} action
 * @return {string} status
 */
var getResponse = function getResponse(_ref3) {
  var payload = _ref3.payload;

  if (payload) return payload;else return null;
};

/**
 * Returns the error and returns null if there isn't any
 * @param {object} action
 * @return {string} status
 */
var getError = function getError(_ref4) {
  var payload = _ref4.payload;

  if (payload) return payload;else return null;
};

var defineProperty = function (obj, key, value) {
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
};

/**
 * Creates the action creator reducer
 * @param {object} initial state
 * @param {object} action
 * @return {object} new state
 */
var asyncReducer = function asyncReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  if (isAsync(action)) {
    var _divideAction = divideAction(action),
        _type = _divideAction.type,
        _status = _divideAction.status;

    return Object.assign({}, state, defineProperty({}, _type, {
      status: getStatus(_status),
      error: _status === 'FAILURE' ? getError(action) : null,
      response: _status === 'SUCCESS' ? getResponse(action) : null
    }));
  } else if (action.type === '@@actionCreator/CLEAR_STATUS') {
    return Object.assign({}, state, defineProperty({}, action.namespace, undefined));
  } else {
    return state;
  }
};

export { makeAction, asyncReducer as reducer };
//# sourceMappingURL=async-action-creator.mjs.map
