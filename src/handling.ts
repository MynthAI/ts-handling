class Problem<T> {
  constructor(public readonly error: T) {}
}

type OkType<T> = {
  ok: true;
  data: T;
  assert: () => T;
  or: (value: T) => T;
  unwrap: () => T;
};
type ErrorType<E> = {
  ok: false;
  error: E;
  assert: () => never;
  or: <T>(value: T) => T;
  unwrap: () => Problem<E>;
};
type Result<T, E> = OkType<T> | ErrorType<E>;

function Ok(): OkType<void>;
function Ok<T>(data: T): OkType<T>;
function Ok<T>(data?: T): OkType<T> | OkType<void> {
  return data === undefined ? voidOk() : runOk(data as T);
}

const voidOk = (): OkType<void> => {
  return {
    ok: true,
    data: undefined,
    assert: () => undefined,
    or: (_) => undefined,
    unwrap: () => undefined,
  };
};

const runOk = <T>(data: T): OkType<T> => {
  return {
    ok: true,
    data,
    assert: () => data,
    or: (_: T) => data,
    unwrap: () => data,
  };
};

const Err = <E>(error: E): ErrorType<E> => {
  return {
    ok: false,
    error,
    assert: () => {
      const message = error?.toString();
      if (!message) console.error(error);
      throw new Error(message);
    },
    or: <T>(value: T) => value,
    unwrap: () => new Problem(error),
  };
};

type Not<T, U> = T extends U ? never : T;

function isProblem<T>(
  result: Not<T, Result<unknown, unknown>> | Problem<string>
): result is Problem<string> {
  return result instanceof Problem;
}

type ExtractedResult<T> = { ok: true; data: T } | { ok: false };
type Success<T> = T extends { ok: true; data: infer D } ? D : never;

/* eslint-disable @typescript-eslint/no-explicit-any */
type ExtractData<F extends (...args: any[]) => ExtractedResult<unknown>> =
  Success<ReturnType<F>>;
type ExtractAsyncData<
  F extends (...args: any[]) => Promise<ExtractedResult<unknown>>
> = Success<Awaited<ReturnType<F>>>;

export {
  Err,
  ErrorType,
  ExtractAsyncData,
  ExtractData,
  isProblem,
  Ok,
  OkType,
  Problem,
  Result,
};
