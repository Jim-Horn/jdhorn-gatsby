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

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;
