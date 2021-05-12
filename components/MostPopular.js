import styled from 'styled-components';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';
import MostPopularItem from '../components/MostPopularItem';

import tempData from '../data/tempData';

const MostPopular = () => {
  const data = tempData.slice(0, 7);
  return (
    <StyledMain>
      <section>
        <h2>most popular breeds</h2>
        {data.map((breed) => {
          const {
            name,
            id,
            image: { url },
          } = breed;
          return <MostPopularItem key={id} name={name} imageUrl={url} />;
        })}

        <h3>50+ breeds you can discover</h3>
        <Link href="/most-popular">
          <a>
            See More <BsArrowRightShort />
          </a>
        </Link>
      </section>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  margin-top: 5em;
  margin-bottom: 5em;

  section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
    place-items: center;
    width: 90vw;
    margin: 0 auto;

    h2,
    h3 {
      text-transform: capitalize;
      font-family: var(--ff-heading);
      color: var(--clr-primary-500);
      text-align: center;
    }

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    h2:nth-child(1) {
      grid-column: span 4;
    }

    .figure-container:nth-child(1),
    .figure-container:nth-child(2) {
      grid-column: span 4;
    }
    .figure-container:nth-child(3),
    .figure-container:nth-child(4),
    .figure-container:nth-child(5) {
      grid-column: span 2;
    }
    .figure-container:nth-child(6) {
      grid-column: span 3;
    }
    .figure-container:nth-child(7),
    .figure-container:nth-child(8) {
      display: none;
    }

    h3:nth-child(9) {
      grid-column: 3 / span 2;
      grid-row: 3;
    }
    a {
      display: flex;
      align-items: center;
      font-size: 0.625rem;
      color: var(--clr-red-500);
      font-family: var(--ff-paragraph);
      font-weight: var(--fw-bold);
    }
  }

  @media (min-width: 768px) {
    section {
      .figure-container:nth-child(6),
      .figure-container:nth-child(7),
      .figure-container:nth-child(8) {
        grid-column: span 2;
      }
      .figure-container:nth-child(7),
      .figure-container:nth-child(8) {
        display: block;
      }
      a {
        grid-column: 3 / span 2;
        grid-row: 5;
        font-size: 1rem;
      }
    }
  }
`;
export default MostPopular;
