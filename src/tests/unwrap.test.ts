import test from "ava";
import invariant from "tests/invariant";
import { Err, Ok, Problem, Result } from "ts-handling";

const run = (succeed: boolean): Result<string, number> => {
  return succeed ? Ok("success") : Err(10);
};

test("can unwrap fail", (t) => {
  const result = run(false).unwrap();
  invariant(result instanceof Problem);
  t.is(result.error, 10);
});

test("can unwrap succeed", (t) => {
  const result = run(true).unwrap();
  invariant(!(result instanceof Problem));
  t.is(result, "success");
});
