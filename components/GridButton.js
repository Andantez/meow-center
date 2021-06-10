import styled from 'styled-components';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { useFiltersContext } from '../context/filters_context';
const GridButton = () => {
  const { setGridView, gridView } = useFiltersContext();
  return (
    <StyledButton type="button" onClick={setGridView} gridView={gridView}>
      <BsFillGrid3X3GapFill />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: fit-content;
  color: ${(props) => (props.gridView ? 'var(--clr-black)' : '#b5b5b5')};
  display: flex;
  align-items: center;
  border: transparent;
  background-color: transparent;
  cursor: pointer;
  transition: transform 250ms ease;
  transform: ${(props) => props.gridView ? "scale(1.1)" : "scale(1)"};
  svg {
    font-size: 1.5rem;
  }
  :hover {
    transform: scale(1.1);
  }
`;
export default GridButton;
