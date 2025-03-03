import styled from 'styled-components';

export const StyledContainer = styled.section`
  /* overflow-x: scroll; */
`;

export const StyledRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, 1fr));
  gap: 0.5rem;
  width: 100%;
  margin-right: -15px;
  margin-left: -15px;
  > * {
    padding-right: 15px;
    padding-left: 15px;
  }
`;
interface ColumnProps {
  span?: number;
  mobileSpan?: number;
  smallerSpan?: number;
}

export const StyledColumn = styled.div<ColumnProps>`
  grid-column: span ${props => props.span || 12};
  @media (max-width: 768px) {
    grid-column: span ${props => props.mobileSpan || props.span || 12};
  }

  @media (max-width: 576px) {
    grid-column: span
      ${props => props.smallerSpan || props.mobileSpan || props.span || 12};
  }
`;

export const StyledFields = styled.div`
  margin-bottom: 1rem;
  align-items: center;
  display: flex;
`;

export const StyledLabel = styled.label`
  font-weight: bold;
`;

export const StyledPossibilities = styled.p`
  font-style: italic;
  font-size: smaller;
`;

export const StyledResults = styled.section`
  position: relative;
  outline: 1px dashed green;
  padding: 1rem;
  font-family: monospace;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const StyledPassword = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  .word {
    color: green;
  }

  .sep {
    color: orangered;
  }
`;

export const StyledCopy = styled.div`
  text-align: center;
  font-size: small;
  margin-bottom: 1rem;
`;

export const StyledOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: green;
  line-height: 1;
  left: 0;
  top: 0;
  z-index: 100;
`;
