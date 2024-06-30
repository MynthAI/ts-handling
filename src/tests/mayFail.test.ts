import test from "ava";
import invariant from "tests/invariant";
import { mayFail } from "ts-handling";

test("can fail", (t) => {
  const result = mayFail(() => {
    throw new Error("Error");
  });

  invariant(!result.ok);
  t.is(result.error, "Error");
});

test("can fail raw", (t) => {
  const result = mayFail(() => {
    throw new Error("Error");
  }, true);

  invariant(!result.ok);
  t.true(result.error.exception instanceof Error);
});

test("can succeed", (t) => {
  const result = mayFail(() => "success");

  invariant(result.ok);
  t.is(result.data, "success");
});
