import styled from 'styled-components';

const FiltersSearch = () => {
  return <StyledInput type="text" placeholder="Search" />;
};

const StyledInput = styled.input`
  font-family: var(--ff-paragraph);
  font-size: 0.8125rem;
  border: transparent;
  background-color: #e4e6eb;
  border-radius: 0.5em;
  padding: 0.5em;
  width: fit-content;
  transition: background-color 350ms ease;
  &:focus {
    outline: 2px solid var(--clr-black);
  }
  ::placeholder {
    color: var(--clr-primary-500);
  }

  :hover {
    background-color: #d6d9e1;
  }
`;
export default FiltersSearch;
