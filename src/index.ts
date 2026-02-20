import { check, checkAsync } from "./check.js";
import type { ExtractAsyncData, ExtractData, Result } from "./handling.js";
import { Err, isProblem, Ok } from "./handling.js";
import { mayFail, mayFailAsync } from "./mayFail.js";

export { check, checkAsync, Err, isProblem, mayFail, mayFailAsync, Ok };
export type { ExtractAsyncData, ExtractData, Result };
