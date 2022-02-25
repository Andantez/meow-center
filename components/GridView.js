import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';

const GridView = ({ breeds }) => {
  return (
    <StyledSection layout>
      {breeds.map((breed) => {
        const {
          name,
          id,
          image: { url },
          blurDataURL,
        } = breed;
        return (
          <motion.article key={id} layout>
            <Link href={`/breeds/${id}`}>
              <a>
                <div className="img-wrapper">
                  <Image
                    src={url}
                    width="300"
                    height="200"
                    alt={name}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </div>
                <h2>{name}</h2>
              </a>
            </Link>
            <div className="arrow">
              <BsArrowRight />
            </div>
          </motion.article>
        );
      })}
    </StyledSection>
  );
};

const StyledSection = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5em;

  .img-wrapper {
    width: 100%;
  }

  a {
    display: grid;
    place-items: center;
    gap: 0.25em;
  }
  .img-wrapper > div {
    border-radius: 0.5em;
  }

  h2 {
    font-size: 1.125rem;
    font-family: var(--ff-paragraph);
    color: var(--clr-primary-500);
  }
  .arrow {
    display: none;
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    margin-top: 2em;
    .img-wrapper > div {
      border-radius: 0.5em;
      border: 1px solid transparent;
      transition: border 250ms ease;
    }
    article {
      position: relative;
    }
    .arrow {
      display: flex;
      position: absolute;
      bottom: 1.08em;
      right: 0;
      font-size: 1.5rem;
      padding: 1.5em;
      background-image: linear-gradient(-45deg, #5f5f81 1%, #343446 100%);
      color: var(--clr-secondary-500);
      clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%);
      border-bottom-right-radius: 0.25em;
      transition: clip-path 250ms ease-out;
      &:hover {
        clip-path: polygon(100% 100%, 100% 0, 48% 50%, 0 100%);
      }
      svg {
        position: absolute;
        bottom: 0.5em;
        right: 0.25em;
        clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%);
        transition: clip-path 250ms ease-out;
      }
    }
    article:hover .img-wrapper > div {
      border: 1px solid var(--clr-primary-500);
    }
    article:hover .arrow {
      clip-path: polygon(100% 100%, 100% 0, 48% 50%, 0 100%);
    }
    article:hover .arrow svg {
      clip-path: polygon(100% 100%, 100% 0, 0 0, 0 100%);
    }
  }
`;
export default GridView;
