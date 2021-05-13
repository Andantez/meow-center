import Image from 'next/image';
import styled from 'styled-components';

const MostPopularItem = ({ name, imageUrl }) => {
  return (
    <FigureStyled className="figure-container">
      <Image src={imageUrl} alt={name} width="450" height="300" />
      <figcaption>{name}</figcaption>
    </FigureStyled>
  );
};

const FigureStyled = styled.figure`
  cursor: pointer;
  /* reminder: tochange it  with framer later. */
  transition: transform 250ms ease;
  transform-origin: bottom;

  &:hover {
    transform: scale(1.05);
  }
  & > div {
    border-radius: 0.5em;
    box-shadow: 0 4px 14px 0 rgba(32, 32, 39, 20%);
  }

  figcaption {
    font-family: var(--ff-paragraph);
    color: var(--clr-primary-500);
    font-weight: var(--fw-normal);
    width: fit-content;
    /* font-size: 0.75rem; */
    margin: 0.5em auto;
    /* back */
  }
`;
export default MostPopularItem;
