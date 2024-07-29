/* eslint-disable no-console */

// #region snippet
// Inside ./snippets/external.ts
export function emptyArra<T>(length: number) {
  return Array.from<T>({ length });
}
// #endregion snippet

export function sayHello() {
  console.log("Hello from snippets/external.ts");
}
