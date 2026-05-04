import React, { useEffect, useRef, useState } from 'react';
import {
  StyledContainer,
  StyledInputGroup,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledStepsContainer,
  StyledStep,
  StyledResult,
  StyledError,
} from './elements';

import {
  isValidNumber,
  computeNumber,
  padNumber,
  generateValidKaprekarNumber,
} from './utils';
import { KAPREKAR_BUTTON_CLICK_EVENT, trackEvent } from '@utils/gtm';

// Constants
const KAPREKAR_CONSTANT = 6174;
const INVALID_NUMBER_MESSAGE =
  'Please enter a valid number between 1 and 9998 with at least two different digits.';

const STEP_ANIMATION_INITIAL_DELAY = 350;
const STEP_ANIMATION_STAGGER = 220;
const RESULT_ANIMATION_DELAY_BUFFER = 180;

type KaprekarStep = {
  iteration: number;
  largest: string;
  smallest: string;
  difference: string;
};

type KaprekarResult = {
  steps: KaprekarStep[];
  reachedConstant: boolean;
  iterations: number;
};

const formatNumber = (num: number): string => padNumber(num.toString());

const calculateKaprekar = (input: string): KaprekarResult => {
  let currentNumber = padNumber(input);
  let iteration = 1;
  const steps: KaprekarStep[] = [];

  while (currentNumber !== KAPREKAR_CONSTANT.toString()) {
    const smallest = computeNumber(currentNumber, true);
    const largest = computeNumber(currentNumber, false);
    const difference = largest - smallest;

    steps.push({
      iteration,
      largest: formatNumber(largest),
      smallest: formatNumber(smallest),
      difference: formatNumber(difference),
    });

    currentNumber = formatNumber(difference);
    iteration++;

    if (difference === 0) break;
  }

  return {
    steps,
    reachedConstant: currentNumber === KAPREKAR_CONSTANT.toString(),
    iterations: iteration - 1,
  };
};

const KaprekarCalculator: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [steps, setSteps] = useState<KaprekarStep[]>([]);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<KaprekarResult | null>(null);
  /** Bumped each successful run so CSS animations restart (forwards fill keeps nodes “finished”). */
  const [animationRunId, setAnimationRunId] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const resultDelay =
    STEP_ANIMATION_INITIAL_DELAY +
    steps.length * STEP_ANIMATION_STAGGER +
    RESULT_ANIMATION_DELAY_BUFFER;

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
      setError(INVALID_NUMBER_MESSAGE);
      setSteps([]);
      setResult(null);
      return;
    }

    trackEvent(KAPREKAR_BUTTON_CLICK_EVENT, { buttonName: 'calculate' });

    const kaprekarResult = calculateKaprekar(normalizedNumber);

    setNumber(normalizedNumber);
    setError('');
    setAnimationRunId(id => id + 1);
    setSteps(kaprekarResult.steps);
    setResult(kaprekarResult);
  };

  const handleRandomNumber = () => {
    trackEvent(KAPREKAR_BUTTON_CLICK_EVENT, { buttonName: 'random' });

    const randomNumber = formatNumber(generateValidKaprekarNumber());
    const kaprekarResult = calculateKaprekar(randomNumber);

    setNumber(randomNumber);
    setError('');
    setAnimationRunId(id => id + 1);
    setSteps(kaprekarResult.steps);
    setResult(kaprekarResult);
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
      {error && <StyledError>{error}</StyledError>}

      {steps.length > 0 && (
        <StyledStepsContainer aria-live="polite">
          {steps.map((step, index) => (
            <StyledStep
              key={`${animationRunId}-${step.iteration}-${step.largest}-${step.smallest}-${step.difference}`}
              $delay={
                STEP_ANIMATION_INITIAL_DELAY + index * STEP_ANIMATION_STAGGER
              }>
              <strong>Iteration {step.iteration}:</strong> {step.largest} -{' '}
              {step.smallest} = {step.difference}
            </StyledStep>
          ))}

          {result?.reachedConstant && (
            <StyledResult key={animationRunId} $delay={resultDelay}>
              Kaprekar&apos;s constant reached: {KAPREKAR_CONSTANT} in{' '}
              {result.iterations} iterations.
            </StyledResult>
          )}
        </StyledStepsContainer>
      )}
    </StyledContainer>
  );
};

export { KaprekarCalculator };
