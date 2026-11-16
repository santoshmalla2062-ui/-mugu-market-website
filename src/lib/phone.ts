const NEPALI_DIGITS: Record<string, string> = {
  "०": "0",
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
};

export function toAsciiDigits(input: string): string {
  if (!input) return "";
  return input.replace(/[०-९]/g, (ch) => NEPALI_DIGITS[ch] ?? ch);
}

export function cleanPhoneDigits(input: string): string {
  if (!input || input.includes("[Your Phone")) return "";
  const ascii = toAsciiDigits(input);
  let digits = ascii.replace(/[^0-9]/g, "");
  if (digits.startsWith("977") && digits.length > 10) {
    digits = digits.slice(3);
  }
  if (digits.startsWith("0") && digits.length > 9) {
    digits = digits.slice(1);
  }
  return digits;
}
