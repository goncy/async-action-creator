import configureMockStore from "redux-mock-store";

import middleware from "../src/middleware";
import { createAction } from "../src/actionCreator";

const mockFetch = ({ response, error }) =>
  jest
    .fn()
    .mockImplementation(
      () =>
        error
          ? Promise.resolve({ status: 500, statusText: error })
          : Promise.resolve({ json: () => response, status: 200 })
    );

const standardAction = createAction("STANDARD_ACTION");
const serviceAction = createAction("SERVICE_ACTION");
const serviceWithoutSelectorsAction = createAction(
  "SERVICE_WITHOUT_SELECTORS_ACTION"
);
const invalidServiceAction = createAction("INVALID_SERVICE_ACTION");
const serviceWithoutStartAction = createAction("SERVICE_WITHOUT_START_ACTION");

describe("Middleware", () => {
  const services = {
    [invalidServiceAction.TYPE]: {
      uri: "http://an.api.com",
      method: "GET"
    },
    [serviceWithoutStartAction.TYPE]: {
      action: serviceWithoutStartAction,
      start: false,
      uri: "http://an.api.com",
      method: "GET"
    },
    [serviceWithoutSelectorsAction.TYPE]: {
      action: serviceWithoutSelectorsAction,
      uri: "http://an.api.com",
      method: "GET"
    },
    [serviceAction.TYPE]: {
      action: serviceAction,
      uri: ({ id = 1 }) => "http://an.api.com/" + id,
      method: "GET",
      onResolve: response => response.value,
      onReject: error => error.statusText,
      options: options => ({ ...options, foo: "bar" })
    }
  };
  const store = configureMockStore([middleware(services)])({});

  describe("Initialize", () => {
    const next = _ => _;
    const action = standardAction.run();

    it("Should handle empty services", () => {
      expect(() => middleware(undefined)(store)(next)(action)).toThrowError();
    });

    it("Should handle empty redux data", () => {
      expect(() =>
        middleware(services)(undefined)(next)(action)
      ).toThrowError();
      expect(() =>
        middleware(services)(store)(undefined)(action)
      ).toThrowError();
      expect(() => middleware(services)(store)(next)(undefined)).toThrowError();
    });
  });

  describe("Execution", () => {
    beforeEach(() => store.clearActions());

    it("Throws an error when no action is passed", async () => {
      expect(() => store.dispatch(invalidServiceAction.run())).toThrowError();
    });

    it("Doesn't fetches when an action doesn't matches", async () => {
      window.fetch = mockFetch({ response: "foo" });

      await store.dispatch(standardAction.run());

      expect(window.fetch).not.toBeCalled();
    });

    it("fetches when an action matches", async () => {
      const payload = { id: 1 };

      window.fetch = mockFetch({ response: "foo" });

      await store.dispatch(serviceAction.run(payload));

      expect(window.fetch).toBeCalled();
    });

    it("Dispatches the run and start actions when a service matches", async () => {
      let actions;
      const response = { value: "foo" };
      const action = serviceWithoutSelectorsAction;

      window.fetch = mockFetch({ response });

      await store.dispatch(action.run());
      actions = store.getActions();

      expect(actions.length).toEqual(3);
      expect(actions).toContainEqual(action.run());
      expect(actions).toContainEqual(action.start());
      expect(actions).toContainEqual(action.resolve(response));
    });

    it("Fetches and returns the response without transformations", async () => {
      let actions;
      const response = { value: "foo" };
      const action = serviceWithoutSelectorsAction;

      window.fetch = mockFetch({ response });

      await store.dispatch(action.run());
      actions = store.getActions();

      expect(actions).toContainEqual(action.resolve(response));
    });

    it("Uri accepts a function", async () => {
      const payload = { id: 50 };
      const response = "foo";
      const action = serviceAction;

      window.fetch = mockFetch({ response });

      await store.dispatch(action.run(payload));

      expect(window.fetch).toHaveBeenCalledWith(
        services[action.TYPE].uri({ id: 50 }),
        {
          foo: "bar",
          method: "GET"
        }
      );
    });

    it("Rejects when the request fails", async () => {
      let actions;
      const error = "foo";
      const action = serviceWithoutSelectorsAction;

      window.fetch = mockFetch({ error });

      await store.dispatch(action.run());
      actions = store.getActions();

      expect(actions).toContainEqual(action.reject(new Error(error)));
    });

    it("Transforms the response with a selector onResolve", async () => {
      let actions;
      const payload = { id: 1 };
      const response = { value: "foo" };
      const action = serviceAction;

      window.fetch = mockFetch({ response });

      await store.dispatch(action.run(payload));
      actions = store.getActions();

      expect(actions).toContainEqual(
        action.resolve(services[action.TYPE].onResolve(response))
      );
    });

    it("Transforms the response with a selector onReject", async () => {
      let actions;
      const payload = { id: 1 };
      const error = "foo";
      const action = serviceAction;

      window.fetch = mockFetch({ error });

      await store.dispatch(action.run(payload));
      actions = store.getActions();

      expect(actions).toContainEqual(
        action.reject(services[action.TYPE].onReject(error))
      );
    });

    it("Transforms the request with a selector options", async () => {
      const payload = { id: 1 };
      const response = "foo";
      const action = serviceAction;

      window.fetch = mockFetch({ response });

      await store.dispatch(action.run(payload));

      expect(window.fetch).toHaveBeenCalledWith(
        services[action.TYPE].uri(payload),
        {
          foo: "bar",
          method: "GET"
        }
      );
    });

    it("Doesn't dispatch a STARTED action if start is false", async () => {
      let actions;
      const payload = { id: 1 };
      const response = { value: "foo" };
      const action = serviceWithoutStartAction;

      window.fetch = mockFetch({ response });

      await store.dispatch(action.run(payload));
      actions = store.getActions();

      expect(actions.length).toEqual(2);
      expect(actions).not.toContainEqual(action.start());
      expect(actions).toContainEqual(action.resolve(response));
    });
  });
});
