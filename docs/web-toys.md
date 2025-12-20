# Web Toys

## Overview

Web Toys are interactive components that provide utility and entertainment. Currently, the site includes two web toys: Kaprekar's Calculator and PassWords generator.

## Kaprekar's Calculator

### Location

- Component: `src/components/KaprekarCalculator/KaprekarCalculator.tsx`
- Page: `src/pages/web-toys/kaprekars-calculator.tsx`
- Utilities: `src/components/KaprekarCalculator/utils.ts`
- Elements: `src/components/KaprekarCalculator/elements.tsx`

### Functionality

Implements Kaprekar's routine to demonstrate that any 4-digit number (with at least two different digits) converges to 6174 (Kaprekar's constant).

**Process:**

1. User enters a 4-digit number
2. Arrange digits in ascending and descending order
3. Subtract smaller from larger
4. Repeat until reaching 6174
5. Display iteration steps

### Features

- Input validation (1-9998, at least 2 different digits)
- Auto-padding to 4 digits
- Step-by-step calculation display
- Read-only output textarea
- Mobile-friendly interface

### Algorithm

```typescript
while (currentNumber !== KAPREKAR_CONSTANT.toString()) {
  const smallest = computeNumber(currentNumber, true); // Ascending
  const largest = computeNumber(currentNumber, false); // Descending
  const difference = largest - smallest;
  currentNumber = padNumber(difference.toString());
  iteration++;
}
```

### Utilities

- `isValidNumber()` - Validates input
- `computeNumber()` - Sorts digits and computes value
- `padNumber()` - Pads to 4 digits with leading zeros

## PassWords Generator

### Location

- Component: `src/components/PassWords/PassWords.tsx`
- Page: `src/pages/web-toys/pass-words.tsx`
- Data: `src/components/PassWords/data.ts`
- Elements: `src/components/PassWords/elements.tsx`
- Utilities: `src/components/PassWords/utils.ts`

### Functionality

Generates memorable passwords by combining random words with separators.

**Features:**

- Configurable word count (2-5 words)
- Separator options:
  - Numbers, punctuation, & symbols
  - Numbers only
  - Punctuation & symbols only
  - None
- Configurable number of passwords (1-25)
- Click to copy to clipboard
- Possibility calculation display

### Password Generation

```typescript
const buildPassword = () => {
  let wordsArray = getRandomArray(data.words, wordLength);
  let separatorsArray = getRandomArray(separators, wordLength - 1);
  // Interleave words and separators
};
```

### Data

Word list stored in `src/components/PassWords/data.ts`:

- `words` - Array of common words
- `numbers` - Array of numeric strings
- `other` - Array of punctuation/symbols

### Features

- Random password generation
- Clipboard copy functionality
- Possibility calculation (combinatorics)
- Visual feedback on copy
- Responsive grid layout

## Web Toys Index

### Location

`src/pages/web-toys.tsx` - Landing page listing all web toys.

### Navigation

- `/web-toys` - Index page
- `/web-toys/kaprekars-calculator` - Kaprekar's Calculator
- `/web-toys/pass-words` - PassWords generator

## Styling

Both components use styled-components:

- Custom styled elements in `elements.tsx`
- Responsive design
- Consistent UI patterns

## Testing

- `KaprekarCalculator.test.tsx` - Calculator tests
- `utils.test.ts` - PassWords utility tests

## Future Enhancements

Potential additions:

- More web toys
- Save/share functionality
- History/statistics
- Export options

---

_Last updated: December 20, 2025_
