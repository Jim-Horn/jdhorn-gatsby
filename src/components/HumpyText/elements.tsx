import styled from 'styled-components';

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

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.5rem 0.625rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  box-sizing: border-box;
`;

export const StyledOutput = styled.div`
  padding: 0.5rem 0.625rem;
  min-height: 3rem;
  font-family: monospace;
  font-size: 1rem;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: break-word;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fafafa;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 1px #007bff33;
  }
`;
