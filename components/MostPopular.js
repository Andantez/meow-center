import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';

import tempData from '../data/tempData';

const MostPopular = () => {
  const data = tempData.slice(0, 5);
  return (
    <StyledMain>
      <section>
        <h2>most popular breeds</h2>
        {/*  Export it to separate component */}
        {data.map((breed) => {
          const {
            name,
            id,
            image: { url },
          } = breed;
          console.log(breed.image);
          return (
            <figure className="figure-container" key={id}>
              <Image src={url} alt={name} width="450" height="300" />
              <figcaption>{name}</figcaption>
            </figure>
          );
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

    .figure-container {
      & > div {
        /* border: 2px solid black; */
      }
    }
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

    .figure-container:nth-child(1) {
      grid-column: span 4;
    }
    .figure-container:nth-child(2) {
      grid-column: span 4;
    }
    .figure-container:nth-child(3) {
      grid-column: span 2;
    }
    .figure-container:nth-child(4) {
      grid-column: span 2;
    }
    .figure-container:nth-child(5) {
      grid-column: span 2;
    }
    .figure-container:nth-child(6) {
      grid-column: span 3;
    }

    h3:nth-child(7) {
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

      svg {
        font-size: 0.625rem;
      }
    }
  }
  img {
    max-width: 100%;
    height: auto;
  }
  figcaption {
    font-family: var(--ff-paragraph);
    color: var(--clr-primary-500);
    font-weight: var(--fw-normal);
    width: fit-content;
    /* font-size: 0.75rem; */
    margin: 0.5em 0;
  }
`;
export default MostPopular;
