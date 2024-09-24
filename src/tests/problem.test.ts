import test from "ava";
import invariant from "tests/invariant";
import { isProblem, mayFail } from "ts-handling";

test("isProblem isn't problem", (t) => {
  const result = mayFail(() => ["not a problem"]).unwrap();
  invariant(!isProblem(result));
  t.deepEqual(result, ["not a problem"]);
});

test("isProblem is a problem", (t) => {
  const result = mayFail(() => {
    throw new Error("this is a problem");
  }).unwrap();
  invariant(isProblem(result));
  t.is(result.error, "this is a problem");
});

test("isProblem value must be unwrapped", (t) => {
  const result = mayFail(() => ["not a problem"]);
  // @ts-expect-error must call .unwrap() first
  invariant(!isProblem(result));
  invariant(!isProblem(result.unwrap()));
  t.pass();
});
