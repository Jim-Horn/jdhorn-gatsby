import styled from 'styled-components';

export const Container = styled.section`
  /* overflow-x: scroll; */
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
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

export const Column = styled.div<ColumnProps>`
  grid-column: span ${props => props.span || 12};
  @media (max-width: 768px) {
    grid-column: span ${props => props.mobileSpan || props.span || 12};
  }

  @media (max-width: 576px) {
    grid-column: span
      ${props => props.smallerSpan || props.mobileSpan || props.span || 12};
  }
`;

export const Fields = styled.div`
  margin-bottom: 1rem;
  align-items: center;
  display: flex;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Possibilities = styled.p`
  font-style: italic;
  font-size: smaller;
`;

export const Results = styled.section`
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

export const Password = styled.div`
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

export const Copy = styled.div`
  text-align: center;
  font-size: small;
  margin-bottom: 1rem;
`;

export const Overlay = styled.div`
  position: absolute;
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
`;
