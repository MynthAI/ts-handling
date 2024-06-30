import test from "ava";
import invariant from "tests/invariant";
import { Err, ExtractAsyncData, ExtractData, Ok } from "ts-handling";

const myAsyncFunc = async () => {
  if (1 / 1 != 1) return Err("Math has failed us");

  return Ok({
    life: "is good",
    math: "is correct",
  });
};

const myFunc = () => {
  if (2 / 2 != 1) return Err("Math has failed us");

  return Ok({
    life: "is good",
    math: "is correct",
  });
};

const myFuncWithParams = (numerator: number, denominator: string) => {
  if (numerator / parseInt(denominator) != 1) return Err("Math has failed us");

  return Ok({
    life: "is good",
    math: "is correct",
  });
};

type MyAsyncFuncData = ExtractAsyncData<typeof myAsyncFunc>;
type MyFuncData = ExtractData<typeof myFunc>;
type MyFuncWithParamsData = ExtractData<typeof myFuncWithParams>;

test("can extract data type", (t) => {
  const result = myFunc();
  invariant(result.ok);
  const data: MyFuncData = result.data;
  t.is(data.life, "is good");
  t.is(data.math, "is correct");
});

test("can extract async data type", async (t) => {
  const result = await myAsyncFunc();
  invariant(result.ok);
  const data: MyAsyncFuncData = result.data;
  t.is(data.life, "is good");
  t.is(data.math, "is correct");
});

test("can extract data type with params", (t) => {
  const result = myFuncWithParams(3, "3");
  invariant(result.ok);
  const data: MyFuncWithParamsData = result.data;
  t.is(data.life, "is good");
  t.is(data.math, "is correct");
});
