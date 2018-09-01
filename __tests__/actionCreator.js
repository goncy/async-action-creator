import { createAction } from "../src";
import { REDUCER_NAME } from "../src/constants";

const actionCreatorFunctionProperties = [
  {
    name: "run",
    payload: {
      foo: "bar"
    },
    result: {
      type: "MY_ACTION",
      payload: {
        foo: "bar"
      }
    }
  },
  {
    name: "start",
    payload: {
      foo: "bar"
    },
    result: {
      type: "MY_ACTION_STARTED",
      payload: {
        foo: "bar"
      }
    }
  },
  {
    name: "cancel",
    payload: {
      foo: "bar"
    },
    result: {
      type: "MY_ACTION_CANCELED",
      payload: {
        foo: "bar"
      }
    }
  },
  {
    name: "resolve",
    payload: {
      foo: "bar"
    },
    result: {
      type: "MY_ACTION_RESOLVED",
      payload: {
        foo: "bar"
      }
    }
  },
  {
    name: "reject",
    payload: {
      foo: "bar"
    },
    result: {
      type: "MY_ACTION_REJECTED",
      payload: {
        foo: "bar"
      }
    }
  },
  {
    name: "getStatus",
    payload: {
      [REDUCER_NAME]: {
        MY_ACTION: {
          status: "pending"
        }
      }
    },
    result: "pending"
  },
  {
    name: "getStatus",
    payload: {
      [REDUCER_NAME]: {}
    },
    result: "init"
  },
  {
    name: "getError",
    payload: {
      [REDUCER_NAME]: {
        MY_ACTION: {
          error: "this is an error"
        }
      }
    },
    result: "this is an error"
  },
  {
    name: "getError",
    payload: {
      [REDUCER_NAME]: {}
    },
    result: undefined
  },
  {
    name: "getResponse",
    payload: {
      [REDUCER_NAME]: {
        MY_ACTION: {
          response: {
            foo: "bar"
          }
        }
      }
    },
    result: {
      foo: "bar"
    }
  },
  {
    name: "getResponse",
    payload: {
      [REDUCER_NAME]: {}
    },
    result: undefined
  },
  {
    name: "clearStatus",
    payload: { [REDUCER_NAME]: {} },
    result: {
      type: "@@actionCreator/CLEAR_STATUS",
      namespace: "MY_ACTION"
    }
  }
];

const actionCreatorStringProperties = [
  "TYPE",
  "CANCELED",
  "STARTED",
  "RESOLVED",
  "REJECTED"
];

describe("Action Creator", () => {
  it("should return an object", () => {
    const actual = typeof createAction("MY_ACTION");
    const expected = "object";

    expect(actual).toBe(expected);
  });

  describe("Function properties", () => {
    const myAction = createAction("MY_ACTION");
    actionCreatorFunctionProperties.forEach(({ name, result, payload }) => {
      it(`should have a ${name} property`, () => {
        const actual = myAction.hasOwnProperty(name);
        const expected = true;

        expect(actual).toEqual(expected);
      });

      it(`${name} property should be a function`, () => {
        const actual = typeof myAction[name];
        const expected = "function";

        expect(actual).toBe(expected);
      });

      it(`${name} property should return correctly`, () => {
        const actual = myAction[name](payload);
        const expected = result;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("String properties", () => {
    const myAction = createAction("MY_ACTION");
    actionCreatorStringProperties.forEach(property => {
      it(`should have a ${property} property`, () => {
        const actual = myAction.hasOwnProperty(property);
        const expected = true;

        expect(actual).toEqual(expected);
      });

      it(`${property} property should be a string`, () => {
        const actual = typeof myAction[property];
        const expected = "string";

        expect(actual).toBe(expected);
      });
    });
  });
});
