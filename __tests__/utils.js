import {getStatus, getError, getResponse} from '../src/utils'

const status = [
  {
    payload: 'START',
    result: 'pending'
  },
  {
    payload: 'SUCCESS',
    result: 'success'
  },
  {
    payload: 'FAILURE',
    result: 'failure'
  },
  {
    payload: undefined,
    result: 'init'
  }
]

const error = [
  {
    payload: {
      foo: 'this is an error'
    },
    result: {
      foo: 'this is an error'
    }
  },
  {
    payload: undefined,
    result: null
  }
]

const response = [
  {
    payload: {
      foo: 'bar'
    },
    result: {
      foo: 'bar'
    }
  },
  {
    payload: undefined,
    result: null
  }
]

describe('Utils', function () {
  describe('getStatus', function () {
    status.forEach(({payload, result}) => {
      test(`should get the status correctly when payload is ${payload}`, function () {
        const actual = getStatus(payload)
        const expected = result
        expect(actual).toEqual(expected)
      })
    })
  })

  describe('getError', function () {
    error.forEach(({payload, result}) => {
      test(`should get the status correctly when payload is ${payload}`, function () {
        const actual = getError({payload})
        const expected = result
        expect(actual).toEqual(expected)
      })
    })
  })

  describe('getResponse', function () {
    response.forEach(({payload, result}) => {
      test(`should get the status correctly when payload is ${payload}`, function () {
        const actual = getResponse({payload})
        const expected = result
        expect(actual).toEqual(expected)
      })
    })
  })
})
