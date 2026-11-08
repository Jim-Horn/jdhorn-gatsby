import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HumpyText } from './HumpyText';
import { toHumpyCase } from './utils';

describe('HumpyText', () => {
  it('renders input and output regions with default text', () => {
    render(<HumpyText />);

    const input = screen.getByLabelText(/your text/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Enter some text');

    const output = screen.getByRole('region', { name: /humpy text/i });
    expect(output).toHaveTextContent(toHumpyCase('Enter some text'));
  });

  it('updates the output when the textarea changes', () => {
    render(<HumpyText />);

    const input = screen.getByLabelText(/your text/i);
    fireEvent.change(input, { target: { value: 'hello world' } });

    expect(screen.getByRole('region', { name: /humpy text/i })).toHaveTextContent(
      'HeLlO wOrLd',
    );
  });

  it('clears to empty output when input is cleared', () => {
    render(<HumpyText />);

    fireEvent.change(screen.getByLabelText(/your text/i), {
      target: { value: '' },
    });

    expect(screen.getByRole('region', { name: /humpy text/i })).toHaveTextContent('');
  });

  it('announces output updates for assistive tech', () => {
    render(<HumpyText />);

    const output = screen.getByRole('region', { name: /humpy text/i });
    expect(output).toHaveAttribute('aria-live', 'polite');
  });
});
