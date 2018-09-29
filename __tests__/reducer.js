import { reducer } from "../src";

const tests = [
  {
    name: "should add a new key in state when STARTED action was dispatched",
    initialState: {},
    action: {
      type: "MY_ACTION_STARTED"
    },
    nextState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    }
  },
  {
    name:
      "should not update error or status when STARTED action was dispatched with a payload",
    initialState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    },
    action: {
      type: "MY_ACTION_STARTED",
      payload: {
        foo: "bar"
      }
    },
    nextState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    }
  },
  {
    name: "should not update error or status when FETCH action was dispatched",
    initialState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    },
    action: {
      type: "MY_ACTION_FETCH",
      payload: {
        foo: "bar"
      }
    },
    nextState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    }
  },
  {
    name: "should not update error or status when REMOVE action was dispatched",
    initialState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    },
    action: {
      type: "MY_ACTION_REMOVE",
      payload: {
        foo: "bar"
      }
    },
    nextState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    }
  },
  {
    name: "should not update error or status when UPDATE action was dispatched",
    initialState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    },
    action: {
      type: "MY_ACTION_UPDATE",
      payload: {
        foo: "bar"
      }
    },
    nextState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    }
  },
  {
    name: "should not update error or status when CREATE action was dispatched",
    initialState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    },
    action: {
      type: "MY_ACTION_CREATE",
      payload: {
        foo: "bar"
      }
    },
    nextState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    }
  },
  {
    name: "should update the status value when RESOLVED action was dispatched",
    initialState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    },
    action: {
      type: "MY_ACTION_RESOLVED",
      payload: {
        foo: "bar"
      }
    },
    nextState: {
      MY_ACTION: {
        status: "resolved",
        response: {
          foo: "bar"
        },
        error: undefined
      }
    }
  },
  {
    name:
      "should update the status value and set error to undefined when REJECTED action was dispatched without a payload",
    initialState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    },
    action: {
      type: "MY_ACTION_REJECTED"
    },
    nextState: {
      MY_ACTION: {
        status: "rejected",
        response: undefined,
        error: undefined
      }
    }
  },
  {
    name:
      "should update the response value correctly when REJECTED action was dispatched with a string value",
    initialState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    },
    action: {
      type: "MY_ACTION_REJECTED",
      payload: "this is an error"
    },
    nextState: {
      MY_ACTION: {
        status: "rejected",
        response: undefined,
        error: "this is an error"
      }
    }
  },
  {
    name: "should reset status and response when STARTED action was dispatched",
    initialState: {
      MY_ACTION: {
        status: "resolved",
        response: "Hello dog",
        error: undefined
      }
    },
    action: {
      type: "MY_ACTION_STARTED"
    },
    nextState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    }
  },
  {
    name: "should reset error when STARTED action was dispatched",
    initialState: {
      MY_ACTION: {
        status: "rejected",
        response: undefined,
        error: "this failed"
      }
    },
    action: {
      type: "MY_ACTION_STARTED"
    },
    nextState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    }
  },
  {
    name:
      "should set the namespace to undefined when CLEAR_STATUS action was dispatched with that action namespace",
    initialState: {
      MY_ACTION: {
        status: "resolved",
        response: "Hello dog",
        error: undefined
      },
      MY_OTHER_ACTION: {
        status: "resolved",
        response: "Hello cat",
        error: undefined
      }
    },
    action: {
      type: "@@actionCreator/CLEAR_STATUS",
      namespace: "MY_ACTION"
    },
    nextState: {
      MY_ACTION: undefined,
      MY_OTHER_ACTION: {
        status: "resolved",
        response: "Hello cat",
        error: undefined
      }
    }
  },
  {
    name: "should return the same state if the action is not async",
    initialState: {
      MY_ACTION: {
        status: "resolved",
        response: "Hello cat",
        error: undefined
      }
    },
    action: {
      type: "MY_ACTION",
      payload: {
        foo: "bar"
      }
    },
    nextState: {
      MY_ACTION: {
        status: "resolved",
        response: "Hello cat",
        error: undefined
      }
    }
  },
  {
    name: "should return an empty object if no state was passed",
    initialState: undefined,
    action: {
      type: "MY_ACTION_STARTED",
      payload: {
        foo: "bar"
      }
    },
    nextState: {
      MY_ACTION: {
        status: "pending",
        response: undefined,
        error: undefined
      }
    }
  }
];

// Iterate over tests
describe("Reducer", () => {
  tests.forEach(item => {
    it(item.name, () => {
      expect(reducer(item.initialState, item.action)).toEqual(item.nextState);
    });
  });
});
