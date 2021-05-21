import styled from 'styled-components';

import Sort from './Sort';
import BreedsList from './BreedsList';
import Filters from './Filters';
import FiltersSearch from './FiltersSearch';
import { ImEqualizer } from 'react-icons/im';

const Breeds = ({ initialData }) => {
  return (
    <StyledMain>
      <div className="container">
        <div className="search-wrapper">
          <FiltersSearch />
          <button type="button" className="btn">
            <ImEqualizer />
          </button>
        </div>
        <aside className="filter-wrapper">
          <Filters />
        </aside>
        <section className="breeds-list">
          <Sort />
          <BreedsList initialData={initialData} />
        </section>
      </div>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  margin: 5em 0;
  .container {
    display: grid;
    width: 90vw;
    margin: 0 auto;
  }

  .search-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .btn {
    border: transparent;
    color: var(--clr-primary-500);
    background: var(--clr-secondary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
    svg {
      font-size: 1.25rem;
    }
  }
`;
export default Breeds;
