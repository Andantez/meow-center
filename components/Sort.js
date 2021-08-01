import styled from 'styled-components';
import ListButton from './ListButton';
import GridButton from './GridButton';
import { useFiltersContext } from '../context/filters_context';

const Sort = () => {
  const { updateSort, filteredBreeds, sort } = useFiltersContext();

  return (
    <StyledDiv>
      <div className="view-buttons">
        <GridButton />
        <ListButton />
      </div>
      <p>{filteredBreeds.length} breeeds found</p>
      <form>
        <label htmlFor="sort">Sort by</label>
        <select name="sort" id="sort" value={sort} onChange={updateSort}>
          <option value="a-z">Name (A - Z)</option>
          <option value="z-a">Name (Z - A)</option>
        </select>
      </form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: none;
  .view-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5em;
  }

  p {
    text-transform: capitalize;
  }

  form {
    margin-left: auto;
  }
  select {
    background: transparent;
    border: none;
    color: var(--clr-primary-500);
    &:hover {
      cursor: pointer;
    }
  }
  label {
    font-weight: var(--fw-bold);
    margin-right: 0.25em;
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 2em;
    font-family: var(--ff-paragraph);
    color: var(--clr-primary-500);
    align-items: center;
  }
`;
export default Sort;
