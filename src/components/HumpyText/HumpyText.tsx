import React, { useMemo, useRef, useState } from 'react';
import {
  StyledContainer,
  StyledInputGroup,
  StyledLabel,
  StyledTextarea,
  StyledOutput,
} from './elements';
import { toHumpyCase } from './utils';

const DEFAULT_TEXT = 'Enter some text';

const selectElementContents = (node: HTMLElement | null) => {
  if (!node) return;
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

export const HumpyText: React.FC = () => {
  const [text, setText] = useState(DEFAULT_TEXT);
  const outputRef = useRef<HTMLDivElement>(null);

  const output = useMemo(() => toHumpyCase(text), [text]);

  return (
    <StyledContainer>
      <StyledInputGroup>
        <StyledLabel htmlFor="humpy-text-input">Your text</StyledLabel>
        <StyledTextarea
          id="humpy-text-input"
          value={text}
          onChange={e => setText(e.target.value)}
          onFocus={e => e.target.select()}
          spellCheck={false}
          autoComplete="off"
        />
      </StyledInputGroup>
      <StyledInputGroup>
        <StyledLabel id="humpy-text-output-label">Humpy text</StyledLabel>
        <StyledOutput
          ref={outputRef}
          tabIndex={0}
          role="region"
          aria-labelledby="humpy-text-output-label"
          aria-live="polite"
          onFocus={() => selectElementContents(outputRef.current)}>
          {output}
        </StyledOutput>
      </StyledInputGroup>
    </StyledContainer>
  );
};
