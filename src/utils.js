/**
 * Checks if the action dispatched is async or not
 * @param {object} action
 * @return {boolean} response
 */
export const isAsync = ({type}) => ['START', 'SUCCESS', 'FAILURE'].indexOf(type.slice(type.lastIndexOf('_') + 1)) >= 0

/**
 * Split the action in type name and async status
 * @param {object} action
 * @return {object} splited action
 */
export const divideAction = ({type}) => ({
  type: type.slice(0, type.lastIndexOf('_')),
  status: type.slice(type.lastIndexOf('_') + 1)
})

/**
 * Returns the next status according to the action type
 * @param {string} type
 * @return {string} status
 */
export const getStatus = status => {
  switch (status) {
    case 'START':
      return 'pending'
    case 'SUCCESS':
      return 'success'
    case 'FAILURE':
      return 'failure'
    default:
      return 'init'
  }
}

/**
 * Returns the payload sent and returns null if there isn't any
 * @param {object} action
 * @return {string} status
 */
export const getResponse = ({payload}) => {
  if (payload) return payload
  else return null
}

/**
 * Returns the error and returns null if there isn't any
 * @param {object} action
 * @return {string} status
 */
export const getError = ({payload}) => {
  if (payload) return payload
  else return null
}