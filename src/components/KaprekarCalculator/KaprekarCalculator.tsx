import React, { useEffect, useRef, useState } from 'react';
import {
  StyledContainer,
  StyledInputGroup,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledTextarea,
} from './elements';

import { isValidNumber, computeNumber, padNumber } from './utils';

// Constants
const LINE_ENDING = '\n';
const KAPREKAR_CONSTANT = 6174;

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

  const handleClick = (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    if (!isValidNumber(number)) {
      setOutput(
        'Please enter a valid number between 1 and 9998 with at least two different digits.',
      );
      return;
    }

    let currentNumber = number;
    let iteration = 1;
    let result = '';

    // Kaprekar's Process
    while (currentNumber !== KAPREKAR_CONSTANT.toString()) {
      const smallest = computeNumber(currentNumber, true); // Ascending order
      const largest = computeNumber(currentNumber, false); // Descending order
      const difference = largest - smallest;

      result += `Iteration ${iteration}: ${largest} - ${smallest} = ${difference}${LINE_ENDING}`;

      // Prepare for the next iteration
      currentNumber = padNumber(difference.toString());
      iteration++;

      if (difference === 0) break; // Prevent infinite loop
    }

    // Append Final Result
    if (currentNumber === KAPREKAR_CONSTANT.toString()) {
      result += `Kaprekar's constant reached: ${currentNumber} in ${
        iteration - 1
      } iterations.${LINE_ENDING}`;
    }

    setOutput(result);
  };

  return (
    <StyledContainer>
      <form onSubmit={handleClick}>
        <StyledInputGroup>
          <StyledLabel htmlFor="numberInput">
            Enter a 4-digit number:
          </StyledLabel>
          <StyledInput
            id="numberInput"
            ref={inputRef}
            type="text"
            value={number}
            onChange={e => setNumber(e.target.value)}
            onBlur={handleBlur}
            placeholder="e.g., 9831"
          />
          <StyledButton onClick={handleClick}>Calculate</StyledButton>
        </StyledInputGroup>
      </form>
      <StyledTextarea value={output} readOnly />
    </StyledContainer>
  );
};

export { KaprekarCalculator };
