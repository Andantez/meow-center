import styled from 'styled-components';
import BreedsHero from '../../components/BreedsHero';
import FiltersSearch from '../../components/FiltersSearch';
import BreedsList from '../../components/BreedsList';
import Sort from '../../components/Sort';
import Filters from '../../components/Filters';
import { ImEqualizer } from 'react-icons/im';
import FiltersSidebar from '../../components/FiltersSidebar';
import { useEffect } from 'react';
import { useFiltersContext } from '../../context/filters_context';
import { AnimatePresence } from 'framer-motion';
import { useRouterScroll } from '@moxy/next-router-scroll';

const BreedsPage = ({ breedsData }) => {
  const {
    openFiltersModal,
    closeFiltersModal,
    isFiltersModalOpen,
    loadBreeds,
    filteredBreeds,
  } = useFiltersContext();
  const { updateScroll } = useRouterScroll();

  useEffect(() => {
    updateScroll();
  }, []);

  useEffect(() => {
    loadBreeds(breedsData); // loads the initial breeds data
  }, []);

  useEffect(() => {
    // prevents the user from scrolling when filters modal is open
    if (isFiltersModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFiltersModalOpen]);

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      closeFiltersModal();
    }
  };
  useEffect(() => {
    // if screen is larger than 1024px set filters modal to false
    // otherwise the document.body.overflow stays set to hidden and prevents from scrolling
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <AnimatePresence>
        {isFiltersModalOpen && <FiltersSidebar />}
      </AnimatePresence>
      <BreedsHero />
      <main>
        <StyledDiv>
          <div className="search-wrapper">
            <FiltersSearch />
            <button type="button" className="btn" onClick={openFiltersModal}>
              <ImEqualizer />
            </button>
          </div>
          <aside className="filter-wrapper">
            <Filters />
          </aside>

          <div className="breeds-list">
            <Sort />
            <BreedsList initialData={filteredBreeds} />
          </div>
        </StyledDiv>
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URI}/breeds`,
    {
      headers: {
        'x-api-key': process.env.X_API_KEY,
      },
    }
  );
  const data = await response.json();

  const breedsWithImage = data.filter((breed) => breed.image?.url); // filters the breeds with Image.url property
  const breedsWithoutImage = data.filter((breed) => !breed.image?.url); // filters the breeds without Image.url property

  const promises = breedsWithoutImage.map(async (item) => {
    // fetch the missing breeds images.
    const imageRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URI}/images/search?breed_id=${item.id}&order=ASC&limit=1`
    );
    const imageData = await imageRes.json();
    return imageData;
  });

  const missingImages = (await Promise.all(promises)).flat();
  const newBreedsWithImage = missingImages.map((breed) => {
    // add image property to the breeds without it.
    const { breeds, id, url, width, height } = breed;
    const breedWithImage = { ...breeds[0], image: { id, url, width, height } };
    return breedWithImage;
  });

  const breedsSorted = [...breedsWithImage, ...newBreedsWithImage].sort(
    (a, b) => a.name.localeCompare(b.name)
  ); //sort the breeds array alphabetically.

  return {
    props: { breedsData: breedsSorted },
    revalidate: 1800,
  };
};

const StyledDiv = styled.div`
  margin: 3em auto 5em;
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
    padding: 0.5em 0;
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
    /* display: grid;
    gap: 2em;
    grid-template-rows: auto 1fr; */
  }

  @media (min-width: 1024px) {
    grid-template-columns: 200px 1fr;
    .filter-wrapper {
      display: initial;
    }
    margin: 10em auto 5em;
    .search-wrapper {
      display: none;
    }
  }
`;
export default BreedsPage;
