import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MostPopularItem = ({ name, imageUrl, id }) => {
  return (
    <FigureStyled
      className="figure-container"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={`/breeds/${id}`}>
        <a>
          <Image src={imageUrl} alt={name} width="450" height="300" />
          <figcaption>{name}</figcaption>
        </a>
      </Link>
    </FigureStyled>
  );
};

const FigureStyled = styled(motion.figure)`
  cursor: pointer;
  position: relative;

  a > div {
    border-radius: 0.5em;
    box-shadow: 0 4px 14px 0 rgba(32, 32, 39, 20%);
  }

  figcaption {
    font-family: var(--ff-paragraph);
    color: var(--clr-primary-500);
    font-weight: var(--fw-normal);
    width: fit-content;
    letter-spacing: 0.05em;
  }

  @media (min-width: 1024px) {
    figcaption {
      position: absolute;
      bottom: 0.22em;
      left: 0em;
      padding: 0.5em 0.5em;
      border-bottom-left-radius: 0.5em;
      border-top-right-radius: 0.5em;
      background: rgba(245, 248, 250, 0.9);
      transition: clip-path 300ms ease 50ms, border 250ms ease;
      clip-path: polygon(0 100%, 0 100%, 100% 100%, 100% 100%);
    }
    &:hover figcaption {
      clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
    }
  }
`;
export default MostPopularItem;
