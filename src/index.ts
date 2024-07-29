import { check, checkAsync } from "./check.js";
import { Err, isProblem, Ok, Problem } from "./handling.js";
import type { ExtractAsyncData, ExtractData, Result } from "./handling.js";
import { mayFail, mayFailAsync } from "./mayFail.js";

export {
  check,
  checkAsync,
  Err,
  isProblem,
  mayFail,
  mayFailAsync,
  Ok,
  Problem,
};
export type { ExtractAsyncData, ExtractData, Result };
