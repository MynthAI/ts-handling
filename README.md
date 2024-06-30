# ts-handling

`ts-handling` is a TypeScript library created to simplify and
standardize error handling in TypeScript applications. Inspired by
Rust’s robust error handling model, this library aims to avoid the
pitfalls of traditional `try-catch` blocks. By using `ts-handling`,
developers can wrap function results and asynchronous operations in a
consistent manner, enabling easy checking and unwrapping of both
successful and failed outcomes.

The motivation behind this library stems from the common issues
encountered with `try-catch` blocks in TypeScript. One major problem is
the lack of clarity regarding which errors can be thrown, often leading
to vague error handling and increased complexity for the caller who must
manage various possible errors. This inconsistency can make code harder
to read, maintain, and debug.

`ts-handling` addresses these issues by providing a type-checked
approach to error handling. With clearly defined success (`Ok`) and
failure (`Err`) outcomes, developers can ensure that all potential
errors are accounted for and handled appropriately. This results in more
predictable, readable, and maintainable code, where the types of errors
are known upfront and managed explicitly, reducing the risk of unhandled
exceptions and improving overall code quality.

## Usage

`ts-handling` provides a set of utilities to handle results in a
type-safe and consistent manner. By wrapping function results in
`Result` types, you can make error handling explicit and avoid common
pitfalls associated with traditional `try-catch` blocks.

### Basic Result Handling

The `ts-handling` library provides a `Result` type that encapsulates
either a successful (`Ok`) result or a failure (`Err`). This approach
helps in making error handling explicit and type-safe. Here is a
detailed example illustrating how to use `Result`, including the
benefits and the proper usage patterns.

#### Example: Success Case

Let’s start with a function that simulates a successful operation.

``` typescript
import { Result, Ok, Err } from "ts-handling";

const successfulOperation = (): Result<string, number> => {
  return Ok("Operation succeeded");
};

const result = successfulOperation();

if (result.ok) {
  console.log("Success:", result.data); // Operation succeeded
}
```

In this example, the `successfulOperation` function always returns an
`Ok` result with a success message. When handling the result, we check
the `result.ok` property to determine if the operation was successful
before accessing `result.data`.

#### Example: Failure Case

Now, let’s look at a function that simulates a failed operation.

``` typescript
const failedOperation = (): Result<string, number> => {
  return Err(404);
};

// Handling the result
const result = failedOperation();

if (!result.ok) {
  console.error("Error:", result.error); // 404
}
```

In this example, the `failedOperation` function always returns an `Err`
result with an error code. When handling the result, we check the
`result.ok` property to determine if the operation failed before
accessing `result.error`.

When creating results, you use `Ok` for successful outcomes and `Err`
for failures. The `Result` type ensures that you can’t access `.data`
unless the result is successful, and you can’t access `.error` unless
the result indicates a failure. This type safety is a key benefit of
using `ts-handling`.

When handling results, you always need to check the `.ok` property
first. This approach makes it clear whether the operation was successful
or not, reducing ambiguity. Here’s how you do it:

``` typescript
const result = successfulOperation();

if (result.ok) {
  // TypeScript knows that result.data is defined and of the correct type
  console.log(result.data);
} else {
  // TypeScript knows that result.error is defined and of the correct type
  console.error(result.error);
}
```

By using `ts-handling`, you make error handling explicit and
type-checked. This ensures you manage both success and failure cases
properly, making your code more robust and maintainable. The consistency
this pattern provides helps in creating code that is easier to
understand and maintain, avoiding the common pitfalls of traditional
error handling methods.

### Asynchronous Result Handling

`ts-handling` provides the `mayFailAsync` function to wrap asynchronous
operations in a `Result` type. This makes error handling explicit and
type-safe.

#### Example: Reading a File Asynchronously

Let’s walk through an example where we read a file asynchronously. This
operation can either succeed, returning the file content, or fail,
resulting in an error.

First, define an asynchronous function to read a file:

``` typescript
import fs from "fs/promises";

const readFile = (filePath: string): Promise<string> =>
  fs.readFile(filePath, "utf-8");
```

The `fs.readFile` function can throw errors if, for example, the file
does not exist or there are permission issues. We can wrap this function
using `mayFailAsync` to handle the errors for us and return a `Result`
type, which allows us to check the outcome safely:

``` typescript
import { mayFailAsync } from "ts-handling";

const result = await mayFailAsync(() => readFile("myfile.txt"));
```

Handling the result involves checking if the operation was successful
before accessing the data:

``` typescript
if (result.ok) {
  console.log("File content:", result.data); // File content if successful
} else {
  console.error("Error reading file:", result.error); // Error message if failed
}
```

### Synchronous Result Handling

`ts-handling` also provides the `mayFail` function to wrap synchronous
operations in a `Result` type. This makes error handling explicit and
type-safe for synchronous functions.

#### Example: Parsing JSON Synchronously

Let’s walk through an example where we parse a JSON string
synchronously. This operation can either succeed, returning the parsed
object, or fail, resulting in an error.

The `JSON.parse` function can throw errors if the input string is not
valid JSON. We can wrap this function using `mayFail` to handle the
errors for us and return a `Result` type, which allows us to check the
outcome safely:

``` typescript
const result = mayFail(() => JSON.parse('{"key": "value"}'));
```

Handling the result involves checking if the operation was successful
before accessing the data:

``` typescript
if (result.ok) {
  console.log("Parsed JSON:", result.data); // Parsed object if successful
} else {
  console.error("Error parsing JSON:", result.error); // Error message if failed
}
```

### Type Extraction

`ts-handling` provides utilities for extracting data types from
functions that return `Result`. This is particularly useful when you
want to infer the return type of a function rather than defining it
explicitly.

Let’s start with a synchronous function that returns a `Result` type:

``` typescript
import { Err, Ok, Result } from "ts-handling";

const myFunc = (): Result<{ life: string; math: string }, string> => {
  return Ok({ life: "is good", math: "is correct" });
};
```

Instead of explicitly defining the return type, you can infer it using
`ExtractData`:

``` typescript
import { Err, Ok, ExtractData } from "ts-handling";

const myFunc = () => {
  return Ok({ life: "is good", math: "is correct" });
};

type MyFuncData = ExtractData<typeof myFunc>;
```

`MyFuncData` is now equivalent to:

``` ts
type MyFuncData = { life: string; math: string };
```

Similarly, for an asynchronous function, you can use `ExtractAsyncData`.

### Summary

`ts-handling` offers a structured approach to error handling in
TypeScript by using the `Result` type for both synchronous and
asynchronous operations. By wrapping functions in `Result`, and using
`mayFail` and `mayFailAsync`, you can manage success and failure cases
explicitly and type-safely.

The library’s utility functions, `ExtractData` and `ExtractAsyncData`,
allow you to infer the return types of functions that produce `Result`
types, simplifying type management and making your code more
maintainable.

Using `ts-handling` helps avoid the ambiguities and complexities of
traditional `try-catch` blocks, ensuring that all potential errors are
handled explicitly. This leads to clearer and more predictable code,
making development and debugging more straightforward.

By incorporating `ts-handling` into your TypeScript projects, you can
achieve more consistent and reliable error handling, improving the
overall quality and maintainability of your code.
