import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { KaprekarCalculator } from './KaprekarCalculator';
import * as utils from './utils';
import * as gtm from '@utils/gtm';

describe('KaprekarCalculator', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the calculator form', () => {
    render(<KaprekarCalculator />);

    expect(
      screen.getByLabelText(/enter a 4-digit number/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /calculate/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /random number/i }),
    ).toBeInTheDocument();
  });

  it('focuses the input on mount', () => {
    render(<KaprekarCalculator />);

    const input = screen.getByLabelText(/enter a 4-digit number/i);
    expect(document.activeElement).toBe(input);
  });

  it('updates input value when typing', () => {
    render(<KaprekarCalculator />);

    const input = screen.getByLabelText(/enter a 4-digit number/i);
    fireEvent.change(input, { target: { value: '1234' } });

    expect(input).toHaveValue('1234');
  });

  it('pads number with zeros on blur when needed', () => {
    render(<KaprekarCalculator />);

    const input = screen.getByLabelText(/enter a 4-digit number/i);
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('0123');
  });

  it('shows error message for invalid input', () => {
    jest.spyOn(utils, 'isValidNumber').mockReturnValue(false);

    render(<KaprekarCalculator />);

    const input = screen.getByLabelText(/enter a 4-digit number/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    fireEvent.change(input, { target: { value: '1111' } });
    fireEvent.click(button);

    expect(
      screen.getByText(
        /please enter a valid number between 1 and 9998 with at least two different digits/i,
      ),
    ).toBeInTheDocument();
  });

  it('calculates and displays Kaprekar sequence', () => {
    render(<KaprekarCalculator />);

    const input = screen.getByLabelText(/enter a 4-digit number/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.click(button);

    expect(screen.getAllByText(/iteration \d+:/i)).toHaveLength(3);
    expect(
      screen.getByText(/kaprekar.*constant reached:\s*6174\s+in\s+3\s+iterations/i),
    ).toBeInTheDocument();
  });

  it('fills a valid random number and shows steps when Random number is clicked', () => {
    jest.spyOn(utils, 'generateValidKaprekarNumber').mockReturnValue(1234);

    render(<KaprekarCalculator />);

    fireEvent.click(screen.getByRole('button', { name: /random number/i }));

    expect(screen.getByLabelText(/enter a 4-digit number/i)).toHaveValue(
      '1234',
    );
    expect(screen.getAllByText(/iteration \d+:/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/kaprekar.*constant reached:\s*6174/i),
    ).toBeInTheDocument();
  });

  it('pushes a GTM dataLayer event when Random number is clicked', () => {
    const pushSpy = jest.spyOn(gtm, 'pushDataLayer').mockImplementation(() => {
      /* no-op: avoid touching real dataLayer */
    });
    jest.spyOn(utils, 'generateValidKaprekarNumber').mockReturnValue(1234);

    render(<KaprekarCalculator />);

    fireEvent.click(screen.getByRole('button', { name: /random number/i }));

    expect(pushSpy).toHaveBeenCalledTimes(1);
    expect(pushSpy).toHaveBeenCalledWith({
      event: gtm.GTM_CUSTOM_EVENTS.kaprekarCalculatorRandomNumber,
      component: 'kaprekar_calculator',
    });
  });
});
