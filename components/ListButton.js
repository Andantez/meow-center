import styled from 'styled-components';
import { FaThList } from 'react-icons/fa';
import { useFiltersContext } from '../context/filters_context';
const ListButton = () => {
  const { setListView, gridView } = useFiltersContext();
  return (
    <StyledButton type="button" onClick={setListView} gridView={gridView}>
      <FaThList />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: fit-content;
  color: ${(props) => (props.gridView ? '#b5b5b5' : 'var(--clr-black)')};
  display: flex;
  align-items: center;
  border: transparent;
  background-color: transparent;
  cursor: pointer;
  transition: transform 250ms ease;
  transform: ${(props) => (props.gridView ? 'scale(1)' : 'scale(1.1)')};
  svg {
    font-size: 1.5rem;
  }
  :hover {
    transform: scale(1.1);
  }
`;
export default ListButton;
