import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import temperamentList from '../data/temperamentList';
import { getUniqueValues } from '../utils/helpers';
import { useFiltersContext } from '../context/filters_context';

const FiltersSidebar = () => {
  const { closeFiltersModal, allBreeds, updateSort, sort } =
    useFiltersContext();
  const breedOrigins = getUniqueValues(allBreeds, 'origin');

  return (
    <StyledDiv>
      <div className="nav-btn">
        <button type="button" onClick={closeFiltersModal}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="container">
        <h1>Filter</h1>
        <form>
          <div className="form-control">
            <h2>Sort By</h2>
            <div className="input-wrapper">
              <div className="form-input">
                <input
                  type="radio"
                  value="a-z"
                  id="a-z"
                  name="alphabetical"
                  checked={sort === 'a-z'}
                  onChange={updateSort}
                />
                <label htmlFor="a-z">Name: A - Z</label>
              </div>

              <div className="form-input">
                <input
                  type="radio"
                  value="z-a"
                  id="z-a"
                  name="alphabetical"
                  onChange={updateSort}
                  checked={sort === 'z-a'}
                />
                <label htmlFor="z-a">Name: Z - A</label>
              </div>
            </div>
          </div>
          <div className="form-control">
            <h2>Temperament</h2>
            <div className="input-wrapper">
              {temperamentList.map((temperament, index) => {
                return (
                  <div className="form-input" key={temperament}>
                    <input
                      type="checkbox"
                      id={`temperament-${index}`}
                      name={temperament}
                      value={temperament}
                    />
                    <label htmlFor={`temperament-${index}`}>
                      {temperament}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="form-control">
            <h2>Origin</h2>
            <div className="input-wrapper">
              {breedOrigins.map((origin) => {
                return (
                  <div className="form-input" key={origin}>
                    <input
                      type="radio"
                      value={origin}
                      name="origin"
                      id={origin}
                    />
                    <label htmlFor={origin}>{origin}</label>
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
      <button type="button" className="clear-btn">
        Clear Filters
      </button>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: fixed;
  top: 0em;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--clr-secondary-500);
  overflow: scroll;
  padding: 1.25em;
  z-index: 999;
  scroll-behavior: smooth;
  .nav-btn {
    /* display: flex;
    justify-content: flex-end; */
    color: var(--clr-secondary-900);
    width: max-content;
    margin-left: auto;
    position: sticky;
    top: 0;
    z-index: 1;
    button {
      background: transparent;
      border: transparent;
      cursor: pointer;
      color: var(--clr-secondary-900);
    }
    svg {
      font-size: 1.5rem;
    }
  }
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.125rem;
  }
  h1,
  h2 {
    color: var(--clr-black);
  }
  h1,
  h2,
  label {
    font-family: var(--ff-paragraph);
  }
  label {
    color: var(--clr-primary-400);
    letter-spacing: 0.5px;
    transition: opacity 250ms ease;
    line-height: 1.5rem;
    &:hover {
      opacity: 0.7;
    }
  }

  label,
  input {
    cursor: pointer;
  }

  .container {
    display: grid;
    gap: 2em;

    form {
      display: grid;
      gap: 2em;
    }
  }
  .form-control {
    display: grid;
    gap: 2em;
    padding-bottom: 2em;
  }
  .form-control:not(:last-child) {
    border-bottom: 1px solid var(--clr-lightgrey);
  }

  .input-wrapper {
    display: grid;
    gap: 0.5em;
  }
  .form-input {
    display: grid;
    grid-template-columns: min-content auto;
    align-items: center;
    gap: 0.5em;
  }
  .clear-btn {
    display: block;
    font-family: var(--ff-paragraph);
    background-color: var(--clr-red-500);
    border: transparent;
    color: var(--clr-secondary-500);
    font-weight: var(--fw-bold);
    padding: 0.5em 2.5em;
    border-radius: 0.5em;
    cursor: pointer;
    margin: 0 auto 2em;
    transition: opacity 250ms ease, transform 250ms ease;
    &:hover {
      opacity: 0.85;
    }
    &:active {
      transform: scale(0.95);
    }
  }
  @media (min-width: 768px) {
    .form-control:nth-child(n + 2) .input-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 1024px) {
    display: none;
  }
`;
export default FiltersSidebar;
