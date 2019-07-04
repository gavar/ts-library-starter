import { set } from "lodash";

/**
 * Inflate properties by checking if key represents a property path.
 * @param props - key-value pairs to inflate.
 */
export function inflate<T>(props: Record<string, any>): T {
  const json = {};
  for (const key in props) {
    const value = valueOf(props[key]);
    set(json, key, value);
  }
  return json as T;
}

function valueOf(v: string): boolean | number | string {
  if (v) {
    if (v === "true") return true;
    if (v === "false") return false;
    if (+v === +v) return +v;
  }
  return v;
}
