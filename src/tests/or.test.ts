import { Err, Ok, Result } from "ts-handling";
import { expect, test } from "vitest";

const run = (succeed: boolean): Result<number, string> =>
  succeed ? Ok(10) : Err("error");

test("or returns data on success", () => {
  expect(run(true).or(5)).toBe(10);
});

test("or returns value on error", () => {
  expect(run(false).or(5)).toBe(5);
});
