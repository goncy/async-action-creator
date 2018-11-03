const middleware = (services, preferences = {}) => store => next => action => {
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
  const httpClient = preferences.httpClient || fetch;

  next(action);

  if (match) {
    const {
      method,
      action,
      onResolve,
      onReject,
      uri: _uri,
      options: _options = {},
      start = true
    } = match;
    const state = store.getState();

    const uri = typeof _uri === "function" ? _uri(payload, state) : _uri;
    const options =
      typeof _options === "function" ? _options(payload, state) : _options;

    if (!action)
      throw new Error(
        `The matched service doesn't receive an 'action' property`
      );

    start && store.dispatch(action.start());

    return httpClient(uri, { ...options, method })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        const error = new Error(response.statusText);
        error.response = response;

        throw error;
      })
      .then(response => response.json())
      .then(data => (onResolve ? onResolve(data, state) : data))
      .then(data => store.dispatch(action.resolve(data)))
      .catch(error =>
        Promise.resolve(onReject ? onReject(error, state) : error).then(error =>
          store.dispatch(action.reject(error))
        )
      );
  }
};

export default middleware;
