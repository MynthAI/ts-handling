import invariant from "tests/invariant";
import { isProblem, mayFail } from "ts-handling";
import { expect, test } from "vitest";

test("isProblem isn't problem", () => {
  const result = mayFail(() => ["not a problem"]).unwrap();
  invariant(!isProblem(result));
  expect(result).toBe(["not a problem"]);
});

test("isProblem is a problem", () => {
  const result = mayFail(() => {
    throw new Error("this is a problem");
  }).unwrap();
  invariant(isProblem(result));
  expect(result.error).toBe("this is a problem");
});

test("isProblem value must be unwrapped", () => {
  const result = mayFail(() => ["not a problem"]);
  // @ts-expect-error must call .unwrap() first
  invariant(!isProblem(result));
  invariant(!isProblem(result.unwrap()));
  expect(result).toBeTruthy();
});
