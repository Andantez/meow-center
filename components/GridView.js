import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const GridView = ({ breeds }) => {
  return (
    <StyledSection>
      {breeds.map((breed, index) => {
        const {
          name,
          id,
          image: { url },
        } = breed;
        return (
          <article key={id}>
            <Link href={`/breeds/${id}`}>
              <a>
                <div className="img-wrapper">
                  <Image src={url} width="300" height="200" alt={name} />
                </div>
                <h2>{name}</h2>
              </a>
            </Link>
          </article>
        );
      })}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5em;

  article {
    transform-origin: bottom;
  }

  article,
  .img-wrapper img {
    transition: transform 250ms ease;
  }

  article:hover,
  article:hover .img-wrapper img {
    transform: scale(1.05);
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

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    margin-top: 2em;
  }
`;
export default GridView;
