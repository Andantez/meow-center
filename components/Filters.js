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
      </form>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  .form-control {
    display: grid;
    width: 200px; /* temporary */
  }
  .form-control:not(:last-child) {
    border-bottom: 2px solid var(--clr-black);
  }
`;
export default Filters;
