/**
 * Returns a random integer between 0 and limit-1
 */
export function getRandom(limit: number): number {
  return parseInt(String(Math.random() * limit), 10);
}

/**
 * Returns an array of random elements from the input array
 */
export function getRandomArray(arr: string[], len: number): string[] {
  let result = [];
  while (len--) {
    result.push(arr[getRandom(arr.length)]);
  }
  return result.reverse();
}
