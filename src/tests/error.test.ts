import { asString } from "error-parser";
import { expect, test } from "vitest";

test("can convert string", () => {
  expect(asString("this is a string")).toBe("this is a string");
});

test("can convert Error", () => {
  expect(asString(new Error("An Error was thrown"))).toBe(
    "An Error was thrown",
  );
});

test("can convert bigint", () => {
  expect(asString(10n)).toBe("10");
});

test("can convert object", () => {
  expect(asString({ msg: "This is an object" })).toBe(
    '{"msg":"1"},"This is an object"',
  );
});

test("can convert class", () => {
  class MyObject {
    constructor(
      public a: string,
      public b: number,
    ) {}
  }

  expect(asString(new MyObject("a", 3))).toBe('{"a":"1","b":3},"a"');
});
