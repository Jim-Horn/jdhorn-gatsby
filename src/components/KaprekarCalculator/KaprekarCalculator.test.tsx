import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { KaprekarCalculator } from './KaprekarCalculator';
import * as utils from './utils';

// Mock the utils functions
jest.mock('./utils', () => ({
  isValidNumber: jest.fn(),
  computeNumber: jest.fn(),
  padNumber: jest.fn(),
}));

describe('KaprekarCalculator', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Default mock implementations
    jest.spyOn(utils, 'isValidNumber').mockImplementation(() => true);
    jest
      .spyOn(utils, 'computeNumber')
      .mockImplementation((num, asc) => (asc ? 1089 : 9801));
    jest.spyOn(utils, 'padNumber').mockImplementation(num => num);
  });

  it('renders the calculator form', () => {
    render(<KaprekarCalculator />);

    // Check that form elements are rendered
    expect(
      screen.getByLabelText(/enter a 4-digit number/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /calculate/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument(); // Output textarea
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
    // Mock isValidNumber to return false
    jest.spyOn(utils, 'isValidNumber').mockImplementation(() => false);

    render(<KaprekarCalculator />);

    const input = screen.getByLabelText(/enter a 4-digit number/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    fireEvent.change(input, { target: { value: '1111' } });
    fireEvent.click(button);

    const output = screen.getByRole('textbox', { name: '' });
    const outputValue = (output as HTMLTextAreaElement).value;
    expect(outputValue).toContain(
      'Please enter a valid number between 1 and 9998',
    );
  });

  it('calculates and displays Kaprekar sequence', () => {
    // Mock the utility functions for a predictable sequence
    const mockComputeNumber = jest.spyOn(utils, 'computeNumber');
    mockComputeNumber
      .mockImplementationOnce((num, asc) => (asc ? 1234 : 4321)) // First iteration
      .mockImplementationOnce((num, asc) => (asc ? 2345 : 5432)) // Second iteration
      .mockImplementationOnce((num, asc) => (asc ? 3456 : 6543)) // Third iteration
      .mockImplementationOnce((num, asc) => (asc ? 6174 : 7641)); // Fourth iteration

    const mockPadNumber = jest.spyOn(utils, 'padNumber');
    mockPadNumber
      .mockImplementationOnce(() => '3087') // Result of 4321 - 1234
      .mockImplementationOnce(() => '3087') // Result of 5432 - 2345
      .mockImplementationOnce(() => '3087') // Result of 6543 - 3456
      .mockImplementationOnce(() => '6174'); // Result of 7641 - 6174

    render(<KaprekarCalculator />);

    const input = screen.getByLabelText(/enter a 4-digit number/i);
    const button = screen.getByRole('button', { name: /calculate/i });

    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.click(button);

    const output = screen.getByRole('textbox', { name: '' });

    // Check that the output contains iteration information
    // We don't need to check the exact values, just that the iterations are shown
    const outputValue = (output as HTMLTextAreaElement).value;
    expect(outputValue).toContain('Iteration 1');
    expect(outputValue).toContain('Iteration 2');
    expect(outputValue).toContain('Iteration 3');
    expect(outputValue).toContain('Iteration 4');
    expect(outputValue).toContain("Kaprekar's constant reached: 6174");
  });
});
