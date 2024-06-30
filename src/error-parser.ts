import { stringify } from "flatted";

type CaughtError = { message: string; exception: unknown };

const toString = (item: unknown): string => {
  if (item === undefined) return "undefined";
  if (item === null) return "null";

  // Check if this is an Error
  if (
    item &&
    typeof item === "object" &&
    "message" in item &&
    typeof item.message === "string"
  )
    return item.message;

  // Check if this is a string
  if (typeof item === "string") return item;

  const stringified = (() => {
    try {
      return stringify(item).slice(1).slice(0, -1);
    } catch {
      return String(item);
    }
  })();

  return stringified.replace(/^'|'$/g, "");
};

const toCaught = (item: unknown): CaughtError => {
  return {
    message: toString(item),
    exception: item,
  };
};

export default toCaught;
export { CaughtError, toString };
