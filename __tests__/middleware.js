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
const invalidServiceAction = createAction("INVALID_SERVICE_ACTION");
const serviceAction = createAction("SERVICE_ACTION");
const noServiceAction = createAction("NO_SERVICE_ACTION");
const serviceWithSelectorAction = createAction("SERVICE_WITH_SELECTOR_ACTION");
const serviceWithoutStartAction = createAction("SERVICE_WITHOUT_START_ACTION");

describe("Middleware", () => {
  const services = {
    [invalidServiceAction.TYPE]: {
      uri: "http://an.api.com",
      method: "GET"
    },
    [serviceAction.TYPE]: {
      action: serviceAction,
      uri: "http://an.api.com",
      method: "GET"
    },
    [serviceWithSelectorAction.TYPE]: {
      action: serviceWithSelectorAction,
      uri: "http://an.api.com",
      method: "GET",
      selector: response => response.value
    },
    [serviceWithoutStartAction.TYPE]: {
      action: serviceWithoutStartAction,
      start: false,
      uri: "http://an.api.com",
      method: "GET"
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

      await store.dispatch(noServiceAction.run());

      expect(window.fetch).not.toBeCalled();
    });

    it("fetches when an action matches", async () => {
      window.fetch = mockFetch({ response: "foo" });

      await store.dispatch(serviceAction.run());

      expect(window.fetch).toBeCalled();
    });

    it("Completes the happy path", async () => {
      let actions;
      const response = { value: "foo" };
      const action = serviceAction;

      window.fetch = mockFetch({ response });

      await store.dispatch(action.run());
      actions = store.getActions();

      expect(actions.length).toEqual(3);
      expect(actions).toContainEqual(action.run());
      expect(actions).toContainEqual(action.start());
      expect(actions).toContainEqual(action.resolve(response));
    });

    it("Fails the happy path", async () => {
      let actions;
      const error = "foo";
      const action = serviceAction;

      window.fetch = mockFetch({ error });

      await store.dispatch(action.run());
      actions = store.getActions();

      expect(actions).toContainEqual(action.reject(new Error(error)));
    });

    it("Transforms the response with a selector", async () => {
      let actions;
      const response = { value: "foo" };
      const action = serviceWithSelectorAction;

      window.fetch = mockFetch({ response });

      await store.dispatch(action.run());
      actions = store.getActions();

      expect(actions.length).toEqual(3);
      expect(actions).toContainEqual(action.run());
      expect(actions).toContainEqual(action.start());
      expect(actions).toContainEqual(
        action.resolve(services[action.TYPE].selector(response))
      );
    });

    it("Doesn't dispatch a STARTED action if start is false", async () => {
      let actions;
      const response = { value: "foo" };
      const action = serviceWithoutStartAction;

      window.fetch = mockFetch({ response });

      await store.dispatch(action.run());
      actions = store.getActions();

      expect(actions.length).toEqual(2);
      expect(actions).toContainEqual(action.run());
      expect(actions).not.toContainEqual(action.start());
      expect(actions).toContainEqual(action.resolve(response));
    });
  });
});
