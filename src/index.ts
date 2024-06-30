import { check, checkAsync } from "./check.js";
import { Err, Ok, Problem } from "./handling.js";
import type { ExtractAsyncData, ExtractData, Result } from "./handling.js";
import { mayFail, mayFailAsync } from "./mayFail.js";

export { check, checkAsync, Err, mayFail, mayFailAsync, Ok, Problem };
export type { ExtractAsyncData, ExtractData, Result };
