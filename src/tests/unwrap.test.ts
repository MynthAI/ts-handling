import invariant from "tests/invariant";
import { Err, Ok, Problem, Result } from "ts-handling";
import { expect, test } from "vitest";

const run = (succeed: boolean): Result<string, number> => {
  return succeed ? Ok("success") : Err(10);
};

test("can unwrap fail", () => {
  const result = run(false).unwrap();
  invariant(result instanceof Problem);
  expect(result.error).toBe(10);
});

test("can unwrap succeed", () => {
  const result = run(true).unwrap();
  invariant(!(result instanceof Problem));
  expect(result).toBe("success");
});
