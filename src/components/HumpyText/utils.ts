const ALPHA = /[a-zA-Z]/;

/** Alternates letter case (first letter uppercase); non-letters leave the toggle unchanged. */
export function toHumpyCase(input: string): string {
  let toggle = false;
  let result = '';

  for (const char of input) {
    if (ALPHA.test(char)) {
      toggle = !toggle;
      result += toggle ? char.toUpperCase() : char.toLowerCase();
    } else {
      result += char;
    }
  }

  return result;
}
