import styled from 'styled-components';
import { useFiltersContext } from '../context/filters_context';

const FiltersSearch = () => {
  const { updateFilters, query } = useFiltersContext();
  return <StyledInput type="text" placeholder="Search" name="query" value={query} onChange={updateFilters}/>;
};

const StyledInput = styled.input`
  font-family: var(--ff-paragraph);
  font-size: 0.8125rem;
  border: transparent;
  background-color: transparent;
  border-radius: 0.5em;
  padding: 0.5em;
  width: fit-content;
  transition: background-color 350ms ease;
  border: 1px solid var(--clr-primary-100);
  
  ::placeholder {
    color: var(--clr-primary-500);
  }

  :hover {
    background-color: #e4e6eb;
  }

  @media (min-width: 1024px) {
    width: 100%;
  }
`;
export default FiltersSearch;
