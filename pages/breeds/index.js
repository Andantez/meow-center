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
import imagePaths from '../../data/imagePaths';
import { getPlaiceholder } from 'plaiceholder';

const BreedsPage = ({ breedsData, heroImage }) => {
  const {
    openFiltersModal,
    closeFiltersModal,
    isFiltersModalOpen,
    loadBreeds,
    filteredBreeds,
  } = useFiltersContext();

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
      <BreedsHero heroImage={heroImage} />
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
        'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
      },
    }
  );
  const data = await response.json();

  const breedsWithImage = data.filter((breed) => breed.image?.url); // filters the breeds with Image.url property
  const breedsWithoutImage = data.filter((breed) => !breed.image?.url); // filters the breeds without Image.url property

  const promises = breedsWithoutImage.flatMap(async (item) => {
    // fetch the missing breeds images.
    const imageRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URI}/images/search?breed_id=${item.id}&order=ASC&limit=1`
    );
    const imageData = await imageRes.json();
    if (imageData.length > 0) {
      const { id, url, width, height } = imageData[0];
      const breed = { ...item, image: { id, url, width, height } };
      return breed;
    } else {
      return [];
    }
  });
  const newBreedsWithImage = (await Promise.all(promises)).flat();

  const breedsSorted = [...breedsWithImage, ...newBreedsWithImage].sort(
    (a, b) => a.name.localeCompare(b.name)
  ); //sort the breeds array alphabetically.

  // generate base64 blurDataURL for hero image.
  const { base64, img } = await getPlaiceholder(imagePaths[5]);

  // generate base64 blurDataURL for all breeds.
  const breedsDataWithBlurUrl = await Promise.all(
    breedsSorted.map(async (src) => {
      const {
        image: { url },
      } = src;
      const { base64 } = await getPlaiceholder(url);

      return {
        ...src,
        blurDataURL: base64,
      };
    })
  ).then((values) => values);

  return {
    props: {
      breedsData: breedsDataWithBlurUrl,
      heroImage: {
        ...img,
        blurDataURL: base64,
      },
    },
    revalidate: 60,
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
