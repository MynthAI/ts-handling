import test from "ava";
import { Err, Ok, Result } from "ts-handling";

const run = (succeed: boolean): Result<string, number> => {
  return succeed ? Ok("success") : Err(10);
};

test("Ok().assert() doesn't throw error", (t) => {
  t.is(run(true).assert(), "success");
});

test("Err().assert() does throw error", (t) => {
  t.throws(() => run(false).assert());
});
