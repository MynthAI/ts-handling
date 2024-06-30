import { Err, Ok, Result } from "./handling.js";

const check = <T>(
  value: T,
  predicate: () => boolean,
  message: string = "Check failed"
): Result<T, string> => {
  try {
    return predicate() ? Ok(value) : Err(message);
  } catch {
    return Err(message);
  }
};

const checkAsync = async <T>(
  value: T,
  predicate: () => Promise<boolean>,
  message: string = "Check failed"
): Promise<Result<T, string>> => {
  try {
    return (await predicate()) ? Ok(value) : Err(message);
  } catch {
    return Err(message);
  }
};

export { check, checkAsync };
