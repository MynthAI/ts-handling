import test from "ava";
import { sleep } from "tests";
import invariant from "tests/invariant";
import { checkAsync } from "ts-handling";

test("can fail", async (t) => {
  const result = await checkAsync("fail", async () => {
    await sleep();
    return false;
  });

  invariant(!result.ok);
  t.is(result.error, "Check failed");
});

test("can succeed", async (t) => {
  const result = await checkAsync("success", async () => {
    await sleep();
    return true;
  });

  invariant(result.ok);
  t.is(result.data, "success");
});
