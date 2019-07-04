import colors from "colors";

/**
 * Terminate node process with error message.
 * @param message - error message to print.
 * @param code - exit code.
 */
export function terminate(message: string, code: number = 1): never {
  console.error(colors.red(message));
  process.exit(code);
  throw message;
}
