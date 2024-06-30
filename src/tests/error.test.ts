import test from "ava";
import { toString } from "error-parser";

test("can convert string", (t) => {
  t.is(toString("this is a string"), "this is a string");
});

test("can convert Error", (t) => {
  t.is(toString(new Error("An Error was thrown")), "An Error was thrown");
});

test("can convert bigint", (t) => {
  t.is(toString(10n), "10");
});

test("can convert object", (t) => {
  t.is(
    toString({ msg: "This is an object" }),
    '{"msg":"1"},"This is an object"'
  );
});

test("can convert class", (t) => {
  class MyObject {
    constructor(public a: string, public b: number) {}
  }

  t.is(toString(new MyObject("a", 3)), '{"a":"1","b":3},"a"');
});
