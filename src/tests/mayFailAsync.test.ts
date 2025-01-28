import { sleep } from "tests";
import invariant from "tests/invariant";
import { mayFailAsync } from "ts-handling";
import { expect, test } from "vitest";

test("can fail", async () => {
  const result = await mayFailAsync(async () => {
    await sleep();
    throw new Error("Error");
  });

  invariant(!result.ok);
  expect(result.error).toBe("Error");
});

test("can fail raw", async () => {
  const result = await mayFailAsync(async () => {
    await sleep();
    throw new Error("Error");
  }, true);

  invariant(!result.ok);
  expect(result.error.exception instanceof Error).toBe(true);
});

test("can succeed", async () => {
  const result = await mayFailAsync(async () => {
    await sleep();
    return "success";
  });

  invariant(result.ok);
  expect(result.data).toBe("success");
});
