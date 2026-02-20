import { Err, Ok, Result } from "ts-handling";
import { expect, test } from "vitest";

const run = (succeed: boolean): Result<void, string> =>
  succeed ? Ok() : Err("error");

test("can use Ok() without params", () => {
  expect(run(false).ok).toBe(false);
  expect(run(true).ok).toBe(true);
});

test("can call Ok(undefined)", () => {
  expect(Ok(undefined).ok).toBe(true);
});
