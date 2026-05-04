export const padNumber = (num: string): string => num.padStart(4, '0');

const sortDigits = (input: string, ascending: boolean): string =>
  input
    .split('')
    .map(Number)
    .sort((a, b) => (ascending ? a - b : b - a))
    .join('');

export const computeNumber = (input: string, ascending: boolean): number =>
  Number(sortDigits(padNumber(input), ascending));

export const isValidNumber = (num: string): boolean => {
  if (!/^\d{1,4}$/.test(num)) return false;

  const number = Number(num);
  const paddedNumber = padNumber(num);

  if (number < 1 || number > 9998) return false; // Must be between 1 and 9998
  if (new Set(paddedNumber).size === 1) return false; // Digits cannot all be the same

  return true;
};

export const generateValidKaprekarNumber = (): number => {
  for (let i = 0; i < 100; i++) {
    const num = Math.floor(Math.random() * 9999) + 1;
    const digits = padNumber(num.toString());
    const uniqueDigits = new Set(digits);

    if (uniqueDigits.size > 1) return num;
  }

  return 1000;
};
