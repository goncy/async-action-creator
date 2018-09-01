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

  if (match) {
    let { uri, method, selector, options = {} } = match;

    next(action);
    store.dispatch({ type: `${type}_STARTED` });

    return fetch(hydrate(uri, payload), { ...options, method })
      .then(response => response.json())
      .then(data => (selector ? selector(data) : data))
      .then(data => store.dispatch({ type: `${type}_RESOLVED`, payload: data }))
      .catch(error =>
        store.dispatch({ type: `${type}_REJECTED`, payload: error })
      );
  } else {
    return next(action);
  }
};

export default middleware;
