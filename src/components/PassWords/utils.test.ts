// First, let's extract the utility functions from PassWords.tsx to test them
import { getRandom, getRandomArray } from './utils';

describe('PassWords utility functions', () => {
  describe('getRandom', () => {
    it('returns a number between 0 and limit-1', () => {
      // Mock Math.random to return a predictable value
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValue(0.5);
      
      const result = getRandom(10);
      expect(result).toBe(5); // 0.5 * 10 = 5
      
      // Restore original Math.random
      Math.random = originalRandom;
    });
    
    it('returns 0 when Math.random returns 0', () => {
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValue(0);
      
      const result = getRandom(10);
      expect(result).toBe(0);
      
      Math.random = originalRandom;
    });
    
    it('returns limit-1 when Math.random returns 0.999...', () => {
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValue(0.999999);
      
      const result = getRandom(10);
      expect(result).toBe(9); // 0.999999 * 10 = 9.99999, parseInt = 9
      
      Math.random = originalRandom;
    });
  });
  
  describe('getRandomArray', () => {
    it('returns an array of the specified length', () => {
      const arr = ['a', 'b', 'c', 'd', 'e'];
      const result = getRandomArray(arr, 3);
      
      expect(result.length).toBe(3);
    });
    
    it('returns elements from the input array', () => {
      const arr = ['a', 'b', 'c', 'd', 'e'];
      
      // Mock getRandom to return predictable values
      jest.spyOn(Math, 'random')
        .mockReturnValueOnce(0.1) // First call returns index 0
        .mockReturnValueOnce(0.3) // Second call returns index 1
        .mockReturnValueOnce(0.5); // Third call returns index 2
      
      const result = getRandomArray(arr, 3);
      
      // The array is reversed in the function, so we expect ['c', 'b', 'a']
      expect(result).toEqual(['c', 'b', 'a']);
      
      // Restore Math.random
      jest.spyOn(Math, 'random').mockRestore();
    });
    
    it('returns an empty array when length is 0', () => {
      const arr = ['a', 'b', 'c'];
      const result = getRandomArray(arr, 0);
      
      expect(result).toEqual([]);
    });
  });
});
