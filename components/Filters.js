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
          <h5>Temperament</h5>
          {temperamentList.map((temperament, index) => {
            return (
              <button key={temperament} type="button" className="temperament">
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
  position: sticky;
  top: 1.5em;
  .form-control {
    display: grid;
    font-family: var(--ff-paragraph);
    margin-bottom: 2em;

    h5,
    label {
      font-size: 1.125rem;
      font-size: 1.125rem;
      color: var(--clr-primary-500);
    }

    h5 {
      margin-bottom: 0.5em;
    }

    label {
      font-weight: var(--fw-bold);
      margin-bottom: 0.938em;
    }

    select {
      color: var(--clr-primary-300);
      background-color: var(--clr-secondary-500);
      padding: 0.125em;
      border-radius: 0.5em;
      width: fit-content;
      font-size: 1rem;
      border: 1px solid var(--clr-primary-100);
    }
  }
  .form-control:nth-child(2) {
    border-bottom: 1px solid var(--clr-primary-100);
    margin-bottom: 1em;
    padding-bottom: 1em;
  }

  .temperament {
    background: transparent;
    border: transparent;
    cursor: pointer;
    color: var(--clr-primary-400);
    margin: 0.35em auto 0.35em 0;
    display: flex;
    transition: opacity 250ms ease;
    letter-spacing: 0.5px;
    line-height: 1.35em;
    :hover {
      opacity: 0.7;
    }
  }

  .clear-btn {
    background-color: var(--clr-red-500);
    border: transparent;
    color: var(--clr-secondary-500);
    font-weight: var(--fw-bold);
    padding: 0.35em 2em;
    border-radius: 0.5em;
    margin: 1em 0;
    width: fit-content;
    cursor: pointer;
  }

  .active {
    color: var(--clr-red-100);
    font-weight: var(--fw-bold);
  }
`;
export default Filters;
