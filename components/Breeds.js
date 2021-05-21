import styled from 'styled-components';

import Sort from './Sort';
import BreedsList from './BreedsList';
import Filters from './Filters';

const Breeds = ({ initialData }) => {
  return (
    <StyledMain>
      <div className="container">
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

const StyledMain = styled.main``;
export default Breeds;
