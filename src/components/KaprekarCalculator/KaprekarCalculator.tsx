import React, { useEffect, useRef, useState } from 'react';
import {
  StyledContainer,
  StyledInputGroup,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledTextarea,
} from './elements';

import {
  isValidNumber,
  computeNumber,
  padNumber,
  generateValidKaprekarNumber,
} from './utils';

// Constants
const LINE_ENDING = '\n';
const KAPREKAR_CONSTANT = 6174;
const INVALID_NUMBER_MESSAGE =
  'Please enter a valid number between 1 and 9998 with at least two different digits.';

const formatNumber = (num: number): string => padNumber(num.toString());

const calculateKaprekar = (input: string): string => {
  let currentNumber = padNumber(input);
  let iteration = 1;
  let result = '';

  while (currentNumber !== KAPREKAR_CONSTANT.toString()) {
    const smallest = computeNumber(currentNumber, true);
    const largest = computeNumber(currentNumber, false);
    const difference = largest - smallest;

    result += `Iteration ${iteration}: ${formatNumber(largest)} - ${formatNumber(
      smallest,
    )} = ${formatNumber(difference)}${LINE_ENDING}`;

    currentNumber = formatNumber(difference);
    iteration++;

    if (difference === 0) break;
  }

  if (currentNumber !== KAPREKAR_CONSTANT.toString()) return result;

  return `${result}Kaprekar's constant reached: ${currentNumber} in ${
    iteration - 1
  } iterations.${LINE_ENDING}`;
};

// React Component
const KaprekarCalculator: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (!isNaN(Number(value)) && value.length > 0 && value.length < 4) {
      setNumber(value.padStart(4, '0'));
    }
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const normalizedNumber = padNumber(number.trim());

    if (!isValidNumber(normalizedNumber)) {
      setOutput(INVALID_NUMBER_MESSAGE);
      return;
    }

    setNumber(normalizedNumber);
    setOutput(calculateKaprekar(normalizedNumber));
  };

  const handleRandomNumber = () => {
    const randomNumber = formatNumber(generateValidKaprekarNumber());
    setNumber(randomNumber);
    setOutput(calculateKaprekar(randomNumber));
  };

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit}>
        <StyledInputGroup>
          <StyledLabel htmlFor="numberInput">
            Enter a 4-digit number:
          </StyledLabel>
          <StyledInput
            id="numberInput"
            ref={inputRef}
            type="tel"
            inputMode="numeric"
            maxLength={4}
            value={number}
            onChange={e => setNumber(e.target.value)}
            onBlur={handleBlur}
            onFocus={ev => ev.target.select()}
            placeholder="e.g., 9831"
          />
          <StyledButton type="submit">Calculate</StyledButton>
          <StyledButton
            type="button"
            onClick={handleRandomNumber}
            style={{ marginLeft: '0.75rem' }}>
            Random number
          </StyledButton>
        </StyledInputGroup>
      </form>
      <StyledTextarea value={output} readOnly />
    </StyledContainer>
  );
};

export { KaprekarCalculator };
