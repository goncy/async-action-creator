import {makeAction} from '../src'

const actionCreatorFunctionProperties = [
  {
    name: 'run',
    payload: {
      foo: 'bar'
    },
    result: {
      type: 'MY_ACTION',
      payload: {
        foo: 'bar'
      }
    }
  },
  {
    name: 'start',
    payload: {
      foo: 'bar'
    },
    result: {
      type: 'MY_ACTION_START',
      payload: {
        foo: 'bar'
      }
    }
  },
  {
    name: 'success',
    payload: {
      foo: 'bar'
    },
    result: {
      type: 'MY_ACTION_SUCCESS',
      payload: {
        foo: 'bar'
      }
    }
  },
  {
    name: 'failure',
    payload: {
      foo: 'bar'
    },
    result: {
      type: 'MY_ACTION_FAILURE',
      payload: {
        foo: 'bar'
      }
    }
  },
  {
    name: 'getStatus',
    payload: {
      async: {
        'MY_ACTION': {
          status: 'pending'
        }
      }
    },
    result: 'pending'
  },
  {
    name: 'getStatus',
    payload: {
      async: {}
    },
    result: 'init'
  },
  {
    name: 'getError',
    payload: {
      async: {
        'MY_ACTION': {
          error: 'this is an error'
        }
      }
    },
    result: 'this is an error'
  },
  {
    name: 'getError',
    payload: {
      async: {}
    },
    result: null
  },
  {
    name: 'getResponse',
    payload: {
      async: {
        'MY_ACTION': {
          response: {
            foo: 'bar'
          }
        }
      }
    },
    result: {
      foo: 'bar'
    }
  },
  {
    name: 'getResponse',
    payload: {
      async: {}
    },
    result: null
  },
  {
    name: 'clearStatus',
    payload: ({async: {}}),
    result: {
      type: '@@actionCreator/CLEAR_STATUS',
      namespace: 'MY_ACTION'
    }
  }
]

const actionCreatorStringProperties = [
  'type',
  'START',
  'SUCCESS',
  'FAILURE'
]

describe('Action Creator', function () {
  test('should return an object', function () {
    const actual = typeof makeAction('MY_ACTION')
    const expected = 'object'

    expect(actual).toBe(expected)
  })
  
  describe('Function properties', function () {
    const myAction = makeAction('MY_ACTION')
    actionCreatorFunctionProperties.forEach(({name, result, payload}) => {
      test(`should have a ${name} property`, function () {
        const actual = myAction.hasOwnProperty(name)
        const expected = true

        expect(actual).toEqual(expected)
      })

      test(`${name} property should be a function`, function () {
        const actual = typeof myAction[name]
        const expected = 'function'

        expect(actual).toBe(expected)
      })

      test(`${name} property should return correctly`, function () {
        const actual = myAction[name](payload)
        const expected = result

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('String properties', function () {
    const myAction = makeAction('MY_ACTION')
    actionCreatorStringProperties.forEach(property => {
      test(`should have a ${property} property`, function () {
        const actual = myAction.hasOwnProperty(property)
        const expected = true

        expect(actual).toEqual(expected)
      })

      test(`${property} property should be a string`, function () {
        const actual = typeof myAction[property]
        const expected = 'string'

        expect(actual).toBe(expected)
      })
    })
  })
})