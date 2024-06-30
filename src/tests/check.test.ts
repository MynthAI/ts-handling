import test from "ava";
import invariant from "tests/invariant";
import { check } from "ts-handling";

test("can fail", (t) => {
  const result = check("fail", () => false);
  invariant(!result.ok);
  t.is(result.error, "Check failed");
});

test("can succeed", (t) => {
  const result = check("success", () => true);
  invariant(result.ok);
  t.is(result.data, "success");
});
