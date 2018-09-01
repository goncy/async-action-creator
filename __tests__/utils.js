import { getStatus, getError, getResponse, hydrate } from "../src/utils";

const status = [
  {
    payload: "STARTED",
    result: "pending"
  },
  {
    payload: "CANCELED",
    result: "canceled"
  },
  {
    payload: "RESOLVED",
    result: "resolved"
  },
  {
    payload: "REJECTED",
    result: "rejected"
  },
  {
    payload: undefined,
    result: "init"
  }
];

const error = [
  {
    payload: {
      foo: "this is an error"
    },
    result: {
      foo: "this is an error"
    }
  },
  {
    payload: undefined,
    result: undefined
  }
];

const response = [
  {
    payload: {
      foo: "bar"
    },
    result: {
      foo: "bar"
    }
  },
  {
    payload: undefined,
    result: undefined
  }
];

describe("Utils", () => {
  describe("getStatus", () => {
    status.forEach(({ payload, result }) => {
      it(`should get the status correctly when payload is ${payload}`, () => {
        const actual = getStatus(payload);
        const expected = result;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("getError", () => {
    error.forEach(({ payload, result }) => {
      it(`should get the status correctly when payload is ${payload}`, () => {
        const actual = getError({ payload });
        const expected = result;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("getResponse", () => {
    response.forEach(({ payload, result }) => {
      it(`should get the status correctly when payload is ${payload}`, () => {
        const actual = getResponse({ payload });
        const expected = result;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("hydrate", () => {
    it(`should hydrate function values`, () => {
      const actual = hydrate(values => ({ values }), { foo: "bar" });
      const expected = { values: { foo: "bar" } };

      expect(actual).toEqual(expected);
    });

    it(`should not hydrate non function values`, () => {
      const actual = hydrate({ bar: "baz" }, { foo: "bar" });
      const expected = { bar: "baz" };

      expect(actual).toEqual(expected);
    });
  });
});
