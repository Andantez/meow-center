import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
const MostPopularItem = ({ name, imageUrl, id }) => {
  return (
    <FigureStyled className="figure-container">
      <Link href={`/breeds/${id}`}>
        <a>
          <Image src={imageUrl} alt={name} width="450" height="300" />
          <figcaption>{name}</figcaption>
        </a>
      </Link>
    </FigureStyled>
  );
};

const FigureStyled = styled.figure`
  cursor: pointer;
  /* reminder: tochange it  with framer later. */
  transition: transform 250ms ease;
  transform-origin: bottom;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }
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
      transition: clip-path 250ms ease 50ms, border 250ms ease;
      clip-path: polygon(0 100%, 0 100%, 100% 100%, 100% 100%);
    }
    /* reminder: change the transition with framer later */
    &:hover figcaption {
      clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
    }
  }
`;
export default MostPopularItem;
