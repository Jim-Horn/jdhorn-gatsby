import { toHumpyCase } from './utils';

describe('toHumpyCase', () => {
  it('returns empty string for empty input', () => {
    expect(toHumpyCase('')).toBe('');
  });

  it('matches default demo string transformation', () => {
    expect(toHumpyCase('Enter some text')).toBe('EnTeR sOmE tExT');
  });

  it('alternates case for letters only', () => {
    expect(toHumpyCase('hello')).toBe('HeLlO');
    expect(toHumpyCase('LiKe So')).toBe('LiKe So');
  });

  it('does not advance the toggle for non-letters', () => {
    expect(toHumpyCase('a1b')).toBe('A1b');
    expect(toHumpyCase('a-b-c')).toBe('A-b-C');
  });

  it('leaves non-letter-only strings unchanged', () => {
    expect(toHumpyCase('123')).toBe('123');
    expect(toHumpyCase('!!!')).toBe('!!!');
    expect(toHumpyCase(' \t\n')).toBe(' \t\n');
  });

  it('normalizes letter casing to the alternating pattern', () => {
    expect(toHumpyCase('HELLO')).toBe('HeLlO');
    expect(toHumpyCase('hello')).toBe('HeLlO');
  });

  it('handles spaces between words', () => {
    expect(toHumpyCase('hi there')).toBe('Hi ThErE');
  });

  it('does not treat non-ASCII letters as alphabetic toggles', () => {
    expect(toHumpyCase('café')).toBe('CaFé');
  });

  it('handles newlines in the input', () => {
    expect(toHumpyCase('ab\ncd')).toBe('Ab\nCd');
  });
});
