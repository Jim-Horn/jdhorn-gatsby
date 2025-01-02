import styled from 'styled-components';

export const StyledContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
`;

export const StyledInputGroup = styled.div`
  margin-bottom: 15px;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const StyledInput = styled.input`
  padding: 8px;
  width: calc(100% - 90px);
  margin-right: 10px;
  font-size: 1rem;
`;

export const StyledButton = styled.button`
  padding: 8px 15px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
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
