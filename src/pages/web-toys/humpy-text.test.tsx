import React from 'react';
import { render, screen } from '@testing-library/react';
import HumpyTextPage from './humpy-text';

jest.mock('gatsby', () => ({
  graphql: jest.fn(() => ({})),
  Link: ({
    to,
    children,
    ...rest
  }: {
    to: string;
    children?: React.ReactNode;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock('../../components', () => {
  const ReactLib = require('react');
  const { HumpyText } = jest.requireActual('../../components/HumpyText');

  return {
    ExternalLink: ({
      href,
      children,
    }: {
      href: string;
      children?: React.ReactNode;
    }) =>
      ReactLib.createElement(
        'a',
        { href, target: '_blank', rel: 'noopener noreferrer' },
        children,
      ),
    HumpyText,
    Layout: ({
      children,
    }: {
      children: React.ReactNode;
    }) => ReactLib.createElement(ReactLib.Fragment, null, children),
    Seo: () => null,
  };
});

describe('HumpyTextPage', () => {
  it('renders title and toy description', () => {
    render(<HumpyTextPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: /humpy text/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/LiKe So/i)).toBeInTheDocument();
  });

  it('links to the CodePen original', () => {
    render(<HumpyTextPage />);

    const link = screen.getByRole('link', { name: /codepen/i });
    expect(link).toHaveAttribute(
      'href',
      'https://codepen.io/JDHorn/pen/MWWoPJK?editors=0010',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('links to related posts', () => {
    render(<HumpyTextPage />);

    expect(screen.getByRole('link', { name: /^this post$/i })).toHaveAttribute(
      'href',
      '/posts/humpy-text/',
    );
    expect(screen.getByRole('link', { name: /coding with ai/i })).toHaveAttribute(
      'href',
      '/posts/coding-with-ai/',
    );
  });

  it('includes the interactive HumpyText widget', () => {
    render(<HumpyTextPage />);

    expect(screen.getByLabelText(/your text/i)).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /humpy text/i })).toBeInTheDocument();
  });
});
