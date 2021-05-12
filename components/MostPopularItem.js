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
  & > div {
    border-radius: 0.5em;
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
export default MostPopularItem;
