import configureMockStore from "redux-mock-store";

import middleware from "../src/middleware";

const mockFetch = ({ response, error }) =>
  jest
    .fn()
    .mockImplementation(
      () =>
        response
          ? Promise.resolve({ json: () => response })
          : Promise.reject(error)
    );

describe("Middleware", () => {
  const services = {
    MATCHING_ACTION: {
      uri: "http://an.api.com",
      method: "GET"
    },
    SELECTOR_ACTION: {
      uri: "http://an.api.com",
      method: "GET",
      selector: response => response.value
    }
  };
  const store = configureMockStore([middleware(services)])({});

  describe("Initialize", () => {
    const next = _ => _;
    const action = { type: "AN_ACTION" };

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

    it("does not fetches when an action matches", async () => {
      window.fetch = mockFetch({ response: "foo" });

      await store.dispatch({ type: "NOT_MATCHING_ACTION" });

      expect(window.fetch).not.toBeCalled();
    });

    it("fetches when an action matches", async () => {
      window.fetch = mockFetch({ response: "foo" });

      await store.dispatch({ type: "MATCHING_ACTION" });

      expect(window.fetch).toBeCalled();
    });

    it("Completes the happy path", async () => {
      let actions;
      const response = { value: "foo" };
      const action = { type: "MATCHING_ACTION" };

      window.fetch = mockFetch({ response });

      await store.dispatch(action);
      actions = store.getActions();

      expect(actions.length).toEqual(3);
      expect(actions).toContainEqual(action);
      expect(actions).toContainEqual({ type: `${action.type}_STARTED` });
      expect(actions).toContainEqual({
        type: `${action.type}_RESOLVED`,
        payload: response
      });
    });

    it("Fails the happy path", async () => {
      let actions;
      const error = "foo";
      const action = { type: "MATCHING_ACTION" };

      window.fetch = mockFetch({ error });

      await store.dispatch(action);
      actions = store.getActions();

      expect(actions).toContainEqual({
        type: `${action.type}_REJECTED`,
        payload: error
      });
    });

    it("Transforms the response with a selector", async () => {
      let actions;
      const response = { value: "foo" };
      const action = { type: "SELECTOR_ACTION" };

      window.fetch = mockFetch({ response });

      await store.dispatch(action);
      actions = store.getActions();

      expect(actions.length).toEqual(3);
      expect(actions).toContainEqual(action);
      expect(actions).toContainEqual({ type: `${action.type}_STARTED` });
      expect(actions).toContainEqual({
        type: `${action.type}_RESOLVED`,
        payload: services[action.type].selector(response)
      });
    });
  });
});
