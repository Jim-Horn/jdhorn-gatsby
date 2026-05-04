import styled, { keyframes, css } from 'styled-components';

export const StyledContainer = styled.div`
  margin: 1.25rem auto;
  font-family: Arial, sans-serif;
`;

export const StyledInputGroup = styled.div`
  margin-bottom: 1rem;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;
`;

export const StyledInput = styled.input`
  padding: 0.5rem;
  margin-right: 0.75rem;
  font-size: 1rem;
`;

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledStepsContainer = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.25rem;
  background-color: #fafafa;
`;

const stepIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

type StepProps = { $delay?: number };

export const StyledStep = styled.div<StepProps>`
  padding: 0.25rem 0;
  font-family: monospace;
  font-size: 0.95rem;
  opacity: 0;

  ${({ $delay = 0 }) => css`
    animation: ${stepIn} 220ms ease forwards;
    animation-delay: ${$delay}ms;
  `}
`;

export const StyledResult = styled.div<StepProps>`
  margin-top: 0.75rem;
  font-weight: bold;
  color: #2c7a2c;
  opacity: 0;

  ${({ $delay = 0 }) => css`
    animation: ${stepIn} 220ms ease forwards;
    animation-delay: ${$delay}ms;
  `}
`;

export const StyledError = styled.div`
  margin-top: 0.75rem;
  color: #b00020;
  font-weight: 500;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;
