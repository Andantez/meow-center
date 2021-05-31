import styled from 'styled-components';
import { FaThList } from 'react-icons/fa';

const ListButton = () => {
  return (
    <StyledButton type="button">
      <FaThList />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: fit-content;
  color: #b5b5b5;
  display: flex;
  align-items: center;
  border: transparent;
  background-color: transparent;
  cursor: pointer;
  transition: transform 250ms ease;
  svg {
    font-size: 1.5rem;
  }
  :hover {
    transform: scale(1.1);
  }
`;
export default ListButton;
