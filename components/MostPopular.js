import styled from 'styled-components';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';
import MostPopularItem from '../components/MostPopularItem';
import tempData from '../data/tempData';
import { motion } from 'framer-motion';
import {
  fadeInAndUp,
  stagger,
  fadeInDown,
} from '../variants/animationVariants';

const MostPopular = () => {
  const data = tempData.slice(5, 12);
  return (
    <StyledMain>
      <motion.section
        initial="initial"
        animate="animate"
        variants={stagger}
        custom={{
          staggerDuration: 0.1,
          staggerDirection: 1,
          delayChildren: 0.5,
        }}
      >
        <motion.h2 variants={fadeInAndUp}>most popular breeds</motion.h2>
        {data.map((breed) => {
          const {
            name,
            id,
            image: { url },
          } = breed;
          return (
            <MostPopularItem key={id} name={name} imageUrl={url} id={id} />
          );
        })}

        <motion.h3 variants={fadeInAndUp}>50+ breeds you can discover</motion.h3>
        <Link href="/most-popular">
          <motion.a variants={fadeInAndUp} className="see-more-link">
            See More <BsArrowRightShort />
          </motion.a>
        </Link>
      </motion.section>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  margin-top: 5em;
  margin-bottom: 5em;
  a {
    cursor: pointer;
  }
  section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
    place-items: center;
    width: 90vw;
    margin: 0 auto;
    max-width: 1200px;

    h2,
    h3 {
      text-transform: capitalize;
      font-family: var(--ff-heading);
      color: var(--clr-primary-500);
      text-align: center;
      text-shadow: 0 2px 5px rgba(32, 32, 39, 20%);
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
    .see-more-link {
      display: flex;
      align-items: center;
      font-size: 0.625rem;
      color: var(--clr-red-500);
      font-family: var(--ff-paragraph);
      font-weight: var(--fw-bold);
      text-shadow: 0 2px 5px rgba(32, 32, 39, 20%);
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
      .see-more-link {
        grid-column: 3 / span 2;
        grid-row: 5;
        font-size: 1rem;
      }
    }
  }

  @media (min-width: 1024px) {
    section {
      grid-template-columns: repeat(12, 1fr);
      gap: 1.5em;
      h2:nth-child(1) {
        grid-column: 2 / span 3;
      }
      h3:nth-child(9) {
        grid-column: 5 / span 4;
        grid-row: 2;
      }
      h2 {
        font-size: 2.5rem;
      }
      h3 {
        font-size: 2rem;
        color: var(--clr-primary-500);
        opacity: 0.9;
      }
      .figure-container:nth-child(2) {
        grid-column: 5 / span 3;
      }
      .figure-container:nth-child(3) {
        grid-column: 8 / span 3;
      }
      .figure-container:nth-child(4) {
        grid-column: 2 / span 3;
      }
      .figure-container:nth-child(5) {
        grid-column: 9 / span 3;
      }

      .figure-container:nth-child(6) {
        grid-column: 2 / span 3;
        grid-row: 3;
      }

      .figure-container:nth-child(7) {
        grid-column: 5 / span 3;
        grid-row: 3;
      }

      .figure-container:nth-child(8) {
        grid-column: 8 / span 3;
        grid-row: 3;
      }
      .see-more-link {
        min-width: max-content;
        grid-column: 11 / span 1;
        grid-row: 3;
        transition: transform 250ms ease;
        transform-origin: left;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
`;
export default MostPopular;
