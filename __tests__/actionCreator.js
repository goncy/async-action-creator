import { makeAction } from "../src"

import { REDUCER_NAME } from "../src/constants"

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
    result: null
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
    result: null
  },
  {
    name: "clearStatus",
    payload: { [REDUCER_NAME]: {} },
    result: {
      type: "@@actionCreator/CLEAR_STATUS",
      namespace: "MY_ACTION"
    }
  }
]

const actionCreatorStringProperties = [
  "TYPE",
  "CANCELED",
  "STARTED",
  "RESOLVED",
  "REJECTED"
]

describe("Action Creator", function() {
  test("should return an object", function() {
    const actual = typeof makeAction("MY_ACTION")
    const expected = "object"

    expect(actual).toBe(expected)
  })

  describe("Function properties", function() {
    const myAction = makeAction("MY_ACTION")
    actionCreatorFunctionProperties.forEach(({ name, result, payload }) => {
      test(`should have a ${name} property`, function() {
        const actual = myAction.hasOwnProperty(name)
        const expected = true

        expect(actual).toEqual(expected)
      })

      test(`${name} property should be a function`, function() {
        const actual = typeof myAction[name]
        const expected = "function"

        expect(actual).toBe(expected)
      })

      test(`${name} property should return correctly`, function() {
        const actual = myAction[name](payload)
        const expected = result

        expect(actual).toEqual(expected)
      })
    })
  })

  describe("String properties", function() {
    const myAction = makeAction("MY_ACTION")
    actionCreatorStringProperties.forEach(property => {
      test(`should have a ${property} property`, function() {
        const actual = myAction.hasOwnProperty(property)
        const expected = true

        expect(actual).toEqual(expected)
      })

      test(`${property} property should be a string`, function() {
        const actual = typeof myAction[property]
        const expected = "string"

        expect(actual).toBe(expected)
      })
    })
  })
})
