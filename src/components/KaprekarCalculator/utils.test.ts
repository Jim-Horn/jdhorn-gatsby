import {
  padNumber,
  computeNumber,
  isValidNumber,
  generateValidKaprekarNumber,
} from './utils';

describe('KaprekarCalculator utils', () => {
  describe('padNumber', () => {
    it('left-pads to four digits', () => {
      expect(padNumber('7')).toBe('0007');
      expect(padNumber('42')).toBe('0042');
      expect(padNumber('9831')).toBe('9831');
    });
  });

  describe('computeNumber', () => {
    it('sorts digits ascending or descending then parses as integer', () => {
      expect(computeNumber('3087', true)).toBe(378);
      expect(computeNumber('3087', false)).toBe(8730);
    });
  });

  describe('isValidNumber', () => {
    it('accepts integers 1–9998 with at least two distinct digits', () => {
      expect(isValidNumber('1')).toBe(true);
      expect(isValidNumber('6174')).toBe(true);
      expect(isValidNumber('9998')).toBe(true);
    });

    it('rejects non-digit or wrong length', () => {
      expect(isValidNumber('')).toBe(false);
      expect(isValidNumber('12a')).toBe(false);
      expect(isValidNumber('12345')).toBe(false);
    });

    it('rejects out of range', () => {
      expect(isValidNumber('0')).toBe(false);
      expect(isValidNumber('9999')).toBe(false);
    });

    it('rejects four identical digits', () => {
      expect(isValidNumber('1111')).toBe(false);
      expect(isValidNumber('9999')).toBe(false);
    });
  });

  describe('generateValidKaprekarNumber', () => {
    afterEach(() => {
      jest.spyOn(Math, 'random').mockRestore();
    });

    it('returns the first candidate when it has more than one unique digit', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0);
      expect(generateValidKaprekarNumber()).toBe(1);
    });

    it('returns a specific value when random maps to that number', () => {
      jest.spyOn(Math, 'random').mockReturnValue(1233.5 / 9999);
      expect(generateValidKaprekarNumber()).toBe(1234);
    });

    it('returns 1000 after max attempts when every candidate is invalid', () => {
      jest.spyOn(Math, 'random').mockReturnValue(1110.5 / 9999);
      expect(generateValidKaprekarNumber()).toBe(1000);
    });
  });
});
