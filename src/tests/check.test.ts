import invariant from "tests/invariant";
import { check } from "ts-handling";
import { expect, test } from "vitest";

test("can fail", () => {
  const result = check("fail", () => false);
  invariant(!result.ok);
  expect(result.error).toBe("Check failed");
});

test("can succeed", () => {
  const result = check("success", () => true);
  invariant(result.ok);
  expect(result.data).toBe("success");
});
