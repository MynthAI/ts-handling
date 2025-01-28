import invariant from "tests/invariant";
import { mayFail } from "ts-handling";
import { expect, test } from "vitest";

test("can fail", () => {
  const result = mayFail(() => {
    throw new Error("Error");
  });

  invariant(!result.ok);
  expect(result.error).toBe("Error");
});

test("can fail raw", () => {
  const result = mayFail(() => {
    throw new Error("Error");
  }, true);

  invariant(!result.ok);
  expect(result.error.exception instanceof Error).toBe(true);
});

test("can succeed", () => {
  const result = mayFail(() => "success");

  invariant(result.ok);
  expect(result.data).toBe("success");
});
