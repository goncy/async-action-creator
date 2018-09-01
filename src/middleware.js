import { hydrate } from "./utils";

const middleware = services => store => next => async action => {
  const { type, payload } = action;
  const match = services[type];

  if (match) {
    let { uri, method, selector, options = {} } = match;

    try {
      next(action);

      store.dispatch({ type: `${type}_STARTED` });

      const request = await fetch(
        hydrate(uri, payload),
        Object.assign({}, { method }, options)
      );
      const response = await request.json();
      const data = selector(response);

      store.dispatch({ type: `${type}_RESOLVED`, payload: data });
    } catch (error) {
      store.dispatch({ type: `${type}_REJECTED`, payload: error });
    }
  } else {
    return next(action);
  }
};

export default middleware;
