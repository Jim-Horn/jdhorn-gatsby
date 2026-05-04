export const padNumber = (num: string): string => num.padStart(4, '0');

export const computeNumber = (input: string, ascending: boolean): number => {
  const sortedDigits = padNumber(input)
    .split('')
    .map(Number)
    .sort((a, b) => (ascending ? a - b : b - a));

  return Number(sortedDigits.join(''));
};

export const isValidNumber = (num: string): boolean => {
  const number = Number(num);
  const paddedNumber = padNumber(num);

  if (Number.isNaN(number) || number < 1 || number > 9998) return false; // Must be between 1 and 9998
  if (new Set(paddedNumber).size === 1) return false; // Digits cannot all be the same

  return true;
};

export const generateValidKaprekarNumber = (): number => {
  while (true) {
    const num = Math.floor(Math.random() * 9999) + 1;
    const digits = padNumber(num.toString());
    const uniqueDigits = new Set(digits);

    if (uniqueDigits.size > 1) return num;
  }
};
