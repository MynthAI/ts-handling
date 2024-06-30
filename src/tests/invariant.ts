const invariant: (condition: unknown) => asserts condition = (condition) => {
  if (condition) return;
  throw new Error();
};

export default invariant;
