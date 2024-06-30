import convert, { CaughtError } from "./error-parser.js";
import { Err, Ok, Result } from "./handling.js";

function mayFail<T>(func: () => T, raw: true): Result<T, CaughtError>;
function mayFail<T>(func: () => T): Result<T, string>;
function mayFail<T>(
  func: () => T,
  raw: boolean = false
): Result<T, string> | Result<T, CaughtError> {
  try {
    return Ok(func());
  } catch (error) {
    const caught = convert(error);
    return raw ? Err(caught) : Err(caught.message);
  }
}

function mayFailAsync<T>(
  func: () => Promise<T>,
  raw: true
): Promise<Result<Awaited<T>, CaughtError>>;
function mayFailAsync<T>(
  func: () => Promise<T>
): Promise<Result<Awaited<T>, string>>;
async function mayFailAsync<T>(
  func: () => Promise<T>,
  raw: boolean = false
): Promise<Result<Awaited<T>, string> | Result<Awaited<T>, CaughtError>> {
  try {
    return Ok(await func());
  } catch (error) {
    const caught = convert(error);
    return raw ? Err(caught) : Err(caught.message);
  }
}

export { mayFail, mayFailAsync };
