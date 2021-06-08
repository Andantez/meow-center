import styled from 'styled-components';
import BreedsHero from '../../components/BreedsHero';
import FiltersSearch from '../../components/FiltersSearch';
import BreedsList from '../../components/BreedsList';
import Sort from '../../components/Sort';
import Filters from '../../components/Filters';
import tempData from '../../data/tempData';
import { ImEqualizer } from 'react-icons/im';
import FiltersSidebar from '../../components/FiltersSidebar';
import { useEffect, useState } from 'react';

const BreedsPage = () => {
  const data = tempData.slice(0, 25); // temporary till getStaticProps is added
  const [filterIsOpen, setFilterIsOpen] = useState(false); //tempory. To be handled by filters Context later

  useEffect(() => {
    // prevents the user from scrolling when filters modal is open
    if (filterIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [filterIsOpen]);

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setFilterIsOpen(false);
    }
  };
  useEffect(() => {
    // if screen is larger than 1024px set filters modal to false
    // otherwise the document.body.overflow stays set to hidden
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      {filterIsOpen && <FiltersSidebar setFilterIsOpen={setFilterIsOpen} />}
      <BreedsHero />
      <main>
        <StyledDiv>
          <div className="search-wrapper">
            <FiltersSearch />
            <button
              type="button"
              className="btn"
              onClick={() => setFilterIsOpen(true)}
            >
              <ImEqualizer />
            </button>
          </div>
          <aside className="filter-wrapper">
            <Filters />
          </aside>

          <div className="breeds-list">
            <Sort />
            <BreedsList initialData={data} />
          </div>
        </StyledDiv>
      </main>
    </>
  );
};

const StyledDiv = styled.div`
  margin: 10em auto 5em;
  width: 90vw;
  display: grid;
  gap: 1em;
  max-width: 1200px;

  .filter-wrapper {
    display: none;
  }
  .search-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    position: sticky;
    top: 0;
    z-index: 9;
    background-color: var(--clr-secondary-500);
    padding: .5em 0;
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
  .breeds-list {
    display: grid;
    gap: 2em;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 200px 1fr;
    .filter-wrapper {
      display: initial;
    }
  }
  @media (min-width: 1024px) {
    .search-wrapper {
      display: none;
    }
  }
`;
export default BreedsPage;
