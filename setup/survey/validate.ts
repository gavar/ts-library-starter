import semver from "semver";

/** Input value validation rule. */
type Rule = (input: string) => boolean | string | Promise<boolean | string>;

/**
 * Check if any of the rules are violated.
 * @param input - input value to check.
 * @param rules - rules to check.
 */
export async function check(input: string, ...rules: Rule[]): Promise<boolean | string> {
  for (const rule of rules) {
    const r = await rule(input);
    if (r !== true) return r;
  }
  return true;
}

/** Check value is not empty. */
export function isNotEmpty(value: string): true | string {
  return value && value.length > 0 ? true : "should not be empty";
}

/** Check value is not blank. */
export function isNotBlank(value: string): true | string {
  return value && value.trim().length > 0 ? true : "should not be blank";
}

/** Check value does not contain whitespace. */
export function hasNoWhitespace(value: string): true | string {
  return /\s/.test(value) ? "should not contain whitespace characters" : true;
}

/** Check value is a valid {@link https://semver.org/ Semantic Versioning}. */
export function isSemVer(value: string): true | string {
  return semver.valid(value) ? true : "should be a valid semantic version: https://semver.org/";
}
