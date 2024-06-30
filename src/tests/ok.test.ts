import test from "ava";
import { Err, Ok, Result } from "ts-handling";

const run = (succeed: boolean): Result<void, string> => {
  return succeed ? Ok() : Err("error");
};

test("can use Ok() without params", (t) => {
  t.false(run(false).ok);
  t.true(run(true).ok);
});

test("can call Ok(undefined)", (t) => {
  t.true(Ok(undefined).ok);
});
