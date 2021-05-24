import styled from 'styled-components';
import BreedsHero from '../../components/BreedsHero';
import FiltersSearch from '../../components/FiltersSearch';
import BreedsList from '../../components/BreedsList';
import Sort from '../../components/Sort';
import Filters from '../../components/Filters';
import tempData from '../../data/tempData';
import { ImEqualizer } from 'react-icons/im';


const BreedsPage = () => {
  const data = tempData.slice(0, 25); // temporary till getStaticProps is added
  return (
    <>
      <BreedsHero />
      <main>
        <StyledDiv>
          <div className="search-wrapper">
            <FiltersSearch />
            <button type="button" className="btn">
              <ImEqualizer />
            </button>
          </div>
          <aside className="filter-wrapper"><Filters /></aside>

          <div className="breeds-list">
          {/* <Sort /> */}
          <BreedsList initialData={data} />
          </div>
        </StyledDiv>
      </main>
    </>
  );
};

const StyledDiv = styled.div`
  margin: 5em auto;
  width: 90vw;
  display: grid;
  gap: 3em;

  .filter-wrapper {
    /* display: none; */
  }
  .search-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    display: none;
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
export default BreedsPage;
