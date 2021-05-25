import styled from 'styled-components';
import FiltersSearch from './FiltersSearch';
import temperamentList from '../data/temperamentList';
import { getUniqueValues } from '../utils/helpers';

import tempData from '../data/tempData';
const Filters = () => {
  const data = tempData; // to be change to get the data from the context later.

  const breedOrigins = getUniqueValues(data, 'origin');
  return (
    <StyledDiv>
      <form>
        <div className="form-control">
          <FiltersSearch />
        </div>
        <div className="form-control">
          {temperamentList.map((temperament) => {
            return (
              <button type="button" className="btn">
                {temperament}
              </button>
            );
          })}
        </div>
        <div className="form-control">
          <label htmlFor="origins">Origin</label>
          <select name="origin" id="origins">
            {breedOrigins.map((origin) => {
              return (
                <option key={origin} value={origin}>
                  {origin}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control">
          <button type="button" className="clear-btn">Clear Filters</button>
        </div>
      </form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  .form-control {
    display: grid;
    width: 200px; /* temporary */
    font-family: var(--ff-paragraph);
    margin-bottom: 1em;
  }
  .form-control:not(:last-child) {
    border-bottom: 2px solid var(--clr-black);
  }

  .clear-btn {
    background-color: var(--clr-red-100);
    border: transparent;
    color: var(--clr-secondary-500);
    font-weight: var(--fw-bold);
    padding: 0.35em 2em;
    border-radius: 0.5em;
    margin: 1em 0;
    width: fit-content;
    cursor: pointer;
  }
`;
export default Filters;
