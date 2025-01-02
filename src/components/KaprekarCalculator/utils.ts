const pipe =
  (...fns: Array<(input: any) => any>) =>
  (input: any) =>
    fns.reduce((acc, fn) => fn(acc), input);

export const padNumber = (num: string): string => num.padStart(4, '0');

const splitNumber = (data: string): string[] => data.split('');

export const createSortArray =
  (ascending: boolean) =>
  (arrNumber: string[]): number[] =>
    arrNumber.map(Number).sort((a, b) => (ascending ? a - b : b - a));

export const joinAndCastNumber = (arrNumber: number[]): number =>
  Number(arrNumber.join(''));

export const computeNumber = (input: string, ascending: boolean): number =>
  pipe(
    padNumber,
    splitNumber,
    createSortArray(ascending),
    joinAndCastNumber,
  )(input);

export const isValidNumber = (num: string): boolean => {
  const number = Number(num);
  if (isNaN(number) || number < 1 || number > 9998) return false; // Must be between 1 and 9998
  if (new Set(num.padStart(4, '0')).size === 1) return false; // Digits cannot all be the same
  return true;
};
