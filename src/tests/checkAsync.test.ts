import { sleep } from "tests";
import invariant from "tests/invariant";
import { checkAsync } from "ts-handling";
import { expect, test } from "vitest";

test("can fail", async () => {
  const result = await checkAsync("fail", async () => {
    await sleep();
    return false;
  });

  invariant(!result.ok);
  expect(result.error).toBe("Check failed");
});

test("can succeed", async () => {
  const result = await checkAsync("success", async () => {
    await sleep();
    return true;
  });

  invariant(result.ok);
  expect(result.data).toBe("success");
});
