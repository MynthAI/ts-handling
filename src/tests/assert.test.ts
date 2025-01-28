import { Err, Ok, Result } from "ts-handling";
import { expect, test } from "vitest";

const run = (succeed: boolean): Result<string, number> => {
  return succeed ? Ok("success") : Err(10);
};

test("Ok().assert() doesn't throw error", () => {
  expect(run(true).assert()).toBe("success");
});

test("Err().assert() does throw error", () => {
  expect(() => run(false).assert()).toThrow();
});
