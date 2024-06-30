import test from "ava";
import { sleep } from "tests";
import invariant from "tests/invariant";
import { mayFailAsync } from "ts-handling";

test("can fail", async (t) => {
  const result = await mayFailAsync(async () => {
    await sleep();
    throw new Error("Error");
  });

  invariant(!result.ok);
  t.is(result.error, "Error");
});

test("can fail raw", async (t) => {
  const result = await mayFailAsync(async () => {
    await sleep();
    throw new Error("Error");
  }, true);

  invariant(!result.ok);
  t.true(result.error.exception instanceof Error);
});

test("can succeed", async (t) => {
  const result = await mayFailAsync(async () => {
    await sleep();
    return "success";
  });

  invariant(result.ok);
  t.is(result.data, "success");
});
