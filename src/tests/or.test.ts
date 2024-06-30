import test from "ava";
import { Err, Ok, Result } from "ts-handling";

const run = (succeed: boolean): Result<number, string> => {
  return succeed ? Ok(10) : Err("error");
};

test("or returns data on success", (t) => {
  t.is(run(true).or(5), 10);
});

test("or returns value on error", (t) => {
  t.is(run(false).or(5), 5);
});
