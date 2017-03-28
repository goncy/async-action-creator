import {reducer} from '../src'

const tests = [
  {
    name: 'should add a new key in state when START action was dispatched',
    initialState: {},
    action: {
      type: 'MY_ACTION_START'
    },
    nextState: {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    }
  },
  {
    name: 'should update the status value when SUCCESS action was dispatched',
    initialState: {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    },
    action: {
      type: 'MY_ACTION_SUCCESS',
      payload: {
        foo: 'bar'
      }
    },
    nextState: {
      MY_ACTION: {
        status: 'success',
        response: {
          foo: 'bar'
        },
        error: null
      }
    }
  },
  {
    name: 'should update the status value and set error to null when FAILURE action was dispatched without a payload',
    initialState: {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    },
    action: {
      type: 'MY_ACTION_FAILURE'
    },
    nextState: {
      MY_ACTION: {
        status: 'failure',
        response: null,
        error: null
      }
    }
  },
  {
    name: 'should update the response value correctly when FAILURE action was dispatched with a string value',
    initialState: {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    },
    action: {
      type: 'MY_ACTION_FAILURE',
      payload: 'this is an error'
    },
    nextState: {
      MY_ACTION: {
        status: 'failure',
        response: null,
        error: 'this is an error'
      }
    }
  },
  {
    name: 'should reset status and response when START action was dispatched',
    initialState: {
      MY_ACTION: {
        status: 'success',
        response: 'Hello dog',
        error: null
      }
    },
    action: {
      type: 'MY_ACTION_START'
    },
    nextState: {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    }
  },
  {
    name: 'should reset error when START action was dispatched',
    initialState: {
      MY_ACTION: {
        status: 'failure',
        response: null,
        error: 'this failed'
      }
    },
    action: {
      type: 'MY_ACTION_START'
    },
    nextState: {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    }
  },
  {
    name: 'should set the namespace to undefined when CLEAR_STATUS action was dispatched with that action namespace',
    initialState: {
      MY_ACTION: {
        status: 'success',
        response: 'Hello dog',
        error: null
      },
      MY_OTHER_ACTION: {
        status: 'success',
        response: 'Hello cat',
        error: null
      }
    },
    action: {
      type: '@@actionCreator/CLEAR_STATUS',
      namespace: 'MY_ACTION'
    },
    nextState: {
      MY_ACTION: undefined,
      MY_OTHER_ACTION: {
        status: 'success',
        response: 'Hello cat',
        error: null
      }
    }
  },
  {
    name: 'should return the same state if the action is not async',
    initialState: {
      MY_ACTION: {
        status: 'success',
        response: 'Hello cat',
        error: null
      }
    },
    action: {
      type: 'MY_ACTION',
      payload: {
        foo: 'bar'
      }
    },
    nextState: {
      MY_ACTION: {
        status: 'success',
        response: 'Hello cat',
        error: null
      }
    }
  },
  {
    name: 'should return an empty object if no state was passed',
    initialState: undefined,
    action: {
      type: 'MY_ACTION_START',
      payload: {
        foo: 'bar'
      }
    },
    nextState: {
      MY_ACTION: {
        status: 'pending',
        response: null,
        error: null
      }
    }
  }
]

// Iterate over tests
describe('Reducer', function () {
  tests.forEach(test => {
    test(test.name, function () {
      expect(reducer(test.initialState, test.action)).toEqual(test.nextState)
    })
  })
})
