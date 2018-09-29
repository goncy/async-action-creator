import { hydrate } from "./utils";

const middleware = services => store => next => action => {
  if (!services)
    throw new Error(`No services were passed to the async-action-creator middleware, you have to pass an object like:
      {
        [string]: {
          uri: string|Function,
          method: string,
          selector?: Function,
          options?: Object|Function
        }
      }
  `);

  if (!store || !next || !action)
    throw new Error(
      `Redux data (store, next or action) is missing, it looks like a configuration problem, take a look and try again`
    );

  const { type, payload } = action;
  const match = services[type];

  next(action);

  if (match) {
    const { uri, method, selector, action, options = {}, start = true } = match;
    const state = store.getState();

    if (!action)
      throw new Error(
        `The matched service doesn't receive an 'action' property`
      );

    start && store.dispatch(action.start());

    return fetch(hydrate(uri, payload, state), { ...options, method })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        const error = new Error(response.statusText);
        error.response = response;

        throw error;
      })
      .then(response => response.json())
      .then(data => (selector ? selector(data, state) : data))
      .then(data => store.dispatch(action.resolve(data)))
      .catch(error => store.dispatch(action.reject(error)));
  }
};

export default middleware;
