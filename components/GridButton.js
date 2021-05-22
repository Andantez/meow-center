import styled from 'styled-components';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';

const GridButton = () => {
  return (
    <StyledButton>
      <BsFillGrid3X3GapFill />
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
    font-size: 1.25rem;
  }
  :hover {
    transform: scale(1.1);
  }
`;
export default GridButton;
