/** JSON embedded in a script element must never contain an HTML tag opener. */
export function scriptJson(value: unknown): string {
  return (JSON.stringify(value) ?? "null").replaceAll("<", "\\u003c");
}
